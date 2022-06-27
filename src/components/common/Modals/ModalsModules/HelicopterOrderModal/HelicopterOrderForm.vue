<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="forms__title">Заказ вертолета</h2>
    <p class="forms__common-text">
      Заполните, пожалуйста, дополнительную информацию.
    </p>
    <div class="forms__content">
      <Input
        v-model:inputModel="formModel.departureCity"
        label="Вылет"
        :isError="isFieldError(v$.formModel.$errors, 'departureCity')"
      />
      <Input label="Прилет" v-model:inputModel="formModel.arrivalCity" />

      <Datepicker
        v-model:datePickerModel="formModel.dateFrom"
        inputLabel="Туда"
        :isError="isFieldError(v$.formModel.$errors, 'dateFrom')"
        :maxDate="formModel.dateTo"
      />
      <Datepicker
        v-model:datePickerModel="formModel.dateTo"
        inputLabel="Обратно"
        :minDate="formModel.dateFrom"
      />

      <Input
        v-model:inputModel="formModel.fullName"
        label="ФИО"
        :isError="isFieldError(v$.formModel.$errors, 'fullName')"
      />
      <Input
        v-model:inputModel="formModel.email"
        label="Эл. почта"
        :isError="isFieldError(v$.formModel.$errors, 'email')"
      />
      <Input
        label="Телефон"
        :mask="MaskRegExps.phone"
        v-model:inputModel="formModel.phone"
        :isError="isFieldError(v$.formModel.$errors, 'phone')"
      />
      <Textarea
        label="Описание работы"
        v-model:textareaModel="formModel.workDescription"
      />
    </div>
    <Button kind="Primary" :isFluid="true" className="forms__submit-btn" :isDisabled="getIsLoading">
      Заказать вертолет
    </Button>
    <p class="forms__secondary-text">
      Нажимая на кнопку, вы даете согласие на
      <a
        class="global_link"
        href="./documents/vityaz-aero_personal-data.pdf"
        target="_blank"
        >обработку персональных данных</a
      >
    </p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isEmpty } from 'lodash'
import Input from '@ui/Input/Input.vue'
import Datepicker from '@shared/Datepicker/Datepicker.vue'
import Textarea from '@ui/Textarea/Textarea.vue'
import Button from '@ui/Button/Button.vue'
import useVuelidate from '@vuelidate/core'
import {
  and, email, helpers, required
} from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import { formMixin } from '@/mixins/formMixin'
import { IHelicopterOrderForm } from '@/models/forms/orderForms'
import { FormRegExps } from '@/constants/regExps'
import { IOrderHelicopter } from '@/models/flightRegistration/api'
import { ERequestStatus } from '@/models/status'

interface IData {
  formModel: IHelicopterOrderForm,
}

export default defineComponent({
  name: 'HelicopterOrderForm',
  components: {
    Button,
    Textarea,
    Input,
    Datepicker
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },
  data: (): IData => {
    return {
      formModel: {
        departureCity: '',
        arrivalCity: '',
        dateFrom: '',
        dateTo: '',
        fullName: '',
        email: '',
        phone: '',
        workDescription: ''
      },
    }
  },
  validations() {
    return {
      formModel: {
        departureCity: { required },
        dateFrom: { required },
        fullName: { required },
        email: { email },
        phone: {
          reqAndRegex: and(required, helpers.regex(FormRegExps.phone))
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getHelicopterFormSmall',
      'getUserInfo',
      'getAuthKey',
      'getAuthConfig',
      'getOpenedModalName',
      'getIsLoading',
    ]),

    processedFormModel(): IOrderHelicopter {
      return {
        date: this.formModel.dateFrom,
        comment: this.formModel.workDescription,
        itinerary: `${this.formModel.departureCity} - ${this.formModel.arrivalCity}`,
        user: {
          name: this.formModel.fullName,
          phone: this.$utils.preparePhone(this.formModel.phone),
          email: this.formModel.email,
          type: this.getUserInfo?.type || 1
        }
      }
    }
  },
  created() {
    this.formModel = {
      ...this.formModel,
      ...this.getHelicopterFormSmall
    }

    if (!isEmpty(this.getUserInfo)) {
      const {
        name, surname, patronymic, phone
      } = this.getUserInfo

      this.formModel = {
        ...this.formModel,
        fullName: `${surname || ''} ${name || ''} ${patronymic || ''}`.trim(),
        email: this.getUserInfo.email,
        phone
      }
    }
  },
  methods: {
    handleSubmit() {
      this.v$.$touch()

      if (!this.v$.formModel.$error) {
        this.v$.$reset()
        this.$store.commit('mutIsLoading', true)

        this.$services
          .orderHelicopter(
            this.getAuthKey ? this.getAuthConfig : undefined,
            this.processedFormModel
          )
          .then((response) => {
            this.formModel = {} as IHelicopterOrderForm
            this.$store.commit('mutIsLoading', false)
            if (response.status === ERequestStatus.Success) {
              if (response.user?.authKey) {
                this.$store.commit('mutAuthKey', response.user.authKey)
                localStorage.setItem('authKey', response.user.authKey)
                this.$store.commit('mutUserInfo', response.user.profile)
              }
              this.$emit('onOrderSuccess')
              return
            }

            if (response.status === ERequestStatus.Error) {
              this.$store.commit('mutOpenedModalName', null)
              this.$store.commit('mutAlertText', 'Не удалось заказать вертолет')
            }
          })
      }
    }
  },

  unmounted() {
    this.$store.commit('mutHelicopterFormSmall', {})
  }
})
</script>

<style scoped lang="scss">
@import '../Forms';
</style>
