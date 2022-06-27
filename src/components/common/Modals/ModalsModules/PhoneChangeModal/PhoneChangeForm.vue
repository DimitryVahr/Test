<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Изменение телефона</h2>

    <div class="forms__content">
      <Input
        label="Телефон"
        :mask="MaskRegExps.phone"
        v-model:inputModel="formModel.phone"
        :isError="isFieldError(v$.formModel.$errors, 'phone')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'phone')"
      />
    </div>

    <Button
      kind="Primary"
      :isFluid="true"
      @click="handleSubmit"
      :isDisabled="getIsLoading"
    >
      Сохранить
    </Button>
  </form>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import Input from '@ui/Input/Input.vue'
import Button from '@ui/Button/Button.vue'
import { mapGetters } from 'vuex'
import { formMixin } from '@/mixins/formMixin'
import { FormRegExps } from '@/constants/regExps'
import { IChangePhoneForm } from '@/models/userAccount/api'
import { ERequestStatus } from '@/models/status'

interface IData {
  formModel: IChangePhoneForm
}

export default defineComponent({
  name: 'PhoneChangeForm',
  components: { Button, Input },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },
  computed: {
    ...mapGetters([
      'getAuthConfig',
      'getUserInfo',
      'getIsLoading'
    ])
  },
  data: (): IData => {
    return {
      formModel: {
        phone: ''
      }
    }
  },
  validations() {
    return {
      formModel: {
        phone: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          wrongFormat: helpers.withMessage(this.ErrorMessages.wrongFormat, helpers.regex(FormRegExps.phone)),
          notSameAsOldPhone: helpers.withMessage(this.ErrorMessages.notSameAsOldPhone, () => {
            return (
              this.$utils.preparePhone(this.formModel.phone) !== this.$utils.preparePhone(this.getUserInfo.phone)
            )
          }),
        }
      },
    }
  },
  methods: {
    handleSubmit(): void {
      this.v$.$touch()

      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)
        const formPreparedData: IChangePhoneForm = { ...this.formModel }
        formPreparedData.phone = this.$utils.preparePhone(this.formModel.phone)

        this.$services.changePhone(formPreparedData, this.getAuthConfig)
          .then((res) => {
            this.$store.commit('mutIsLoading', false)
            if (res.status === ERequestStatus.Success) {
              this.formModel = {} as IChangePhoneForm
              this.v$.$reset()
              this.$emit('onPhoneChangeSuccess', formPreparedData.phone)
            } else {
              this.$store.commit('mutAlertText', 'Ошибка при попытке сменить номер телефона')
            }
          })
      }

    }
  },
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
