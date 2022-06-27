<template>
  <form @submit.prevent="">
    <h2 class="forms__title">{{ getUserInfo.title || '-' }}</h2>
    <div class="forms__content">
      <h3 class="forms__sectionTitle">
        Реквизиты
      </h3>
      <Input
        label="Название"
        v-model:inputModel="formModel.info.fullTitle"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'fullTitle')"
      />
      <InputAutocomplete
        v-model:inputModel="formModel.info.ogrn"
        label="ОГРН"
        :isError="isFieldError(v$.formModel.$errors, 'ogrn')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'ogrn')"
        :autocompleteConfig="{
          apiEndpointName: 'suggestParty',
          count: 5,
          subfield: 'ogrn'
        }"
        @onSelect="fillOrganizationInfo"
      />
      <div class="forms__grid forms__grid_two">
        <Input
          label="ИНН"
          v-model:inputModel="formModel.info.inn"
          :mask="MaskRegExps.inn"
          :isError="isFieldError(v$.formModel.$errors, 'inn')"
          :errorText="getFieldErrorMsg(v$.formModel.$errors, 'inn')"
        />
        <Input
          label="КПП"
          v-model:inputModel="formModel.info.kpp"
          :mask="MaskRegExps.kpp"
          :isError="isFieldError(v$.formModel.$errors, 'kpp')"
          :errorText="getFieldErrorMsg(v$.formModel.$errors, 'kpp')"
        />
      </div>
      <InputAutocomplete
        label="БИК"
        v-model:inputModel="formModel.info.bic"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'bic')"
        :autocompleteConfig="{
          apiEndpointName: 'suggestBank',
          count: 5,
          subfield: 'bic'
        }"
        @onSelect="fillBankInfo"
      />
      <Input
        label="Расчетный счет"
        v-model:inputModel="formModel.info.account"
        :mask="MaskRegExps.account"
        :isError="isFieldError(v$.formModel.$errors, 'account')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'account')"
       />
      <Textarea
        label="Наименование банка"
        v-model:textareaModel="formModel.info.bank"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'bank')"
      />
      <Textarea
        label="Юридический адрес"
        v-model:textareaModel="formModel.info.address"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'address')"
      />
      <Textarea
        label="Почтовый адрес"
        v-model:textareaModel="formModel.info.addressPost"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'addressPost')"
      />
    </div>
    <Button
      kind="Primary"
      :isFluid="true"
      className="forms__submit-btn"
      @click="handleSubmit"
      :isDisabled="getIsLoading"
    >
      Сохранить
    </Button>
  </form>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Button from '@ui/Button/Button.vue'
import useVuelidate from '@vuelidate/core'
import {
  helpers,
  required,
} from '@vuelidate/validators'
import Textarea from '@ui/Textarea/Textarea.vue'
import Input from '@ui/Input/Input.vue'
import InputAutocomplete from '@shared/InputAutocomplete/InputAutocomplete.vue'
import { formMixin } from '@/mixins/formMixin'
import { IOrganizationProfileUpdateForm } from '@/models/forms/userForms'
import { ISuggestion } from '@/models/forms/authForms'

interface IData {
  formModel: IOrganizationProfileUpdateForm,
}

export default defineComponent({
  name: 'OrganizationUpdateForm',
  components: {
    Button,
    Textarea,
    Input,
    InputAutocomplete,
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },
  data: (): IData => {
    return {
      formModel: {
        info: {
          account: '',
          address: '',
          addressPost: '',
          bank: '',
          bic: '',
          inn: '',
          kpp: '',
          ogrn: '',
          correspondent_account: '',
          fullTitle: '',
        }
      },
    }
  },
  validations() {
    return {
      formModel: {
        info: {
          account: {
            required: helpers.withMessage(this.ErrorMessages.required, required),
            fieldLength: helpers.withMessage(this.ErrorMessages.fieldDigits, helpers.regex(this.FormRegExps.account)),
          },
          ogrn: {
            fieldLength: helpers.withMessage(this.ErrorMessages.fieldDigits, helpers.regex(this.FormRegExps.ogrn)),
            required: helpers.withMessage(this.ErrorMessages.required, required)
          },
          fullTitle: {
            required: helpers.withMessage(this.ErrorMessages.required, required)
          },
          inn: {
            required: helpers.withMessage(this.ErrorMessages.required, required)
          },
          kpp: {
            required: helpers.withMessage(this.ErrorMessages.required, required)
          },
          bic: {
            fieldLength: helpers.withMessage(this.ErrorMessages.fieldDigits, helpers.regex(this.FormRegExps.bic)),
            required: helpers.withMessage(this.ErrorMessages.required, required)
          },
          bank: {
            required: helpers.withMessage(this.ErrorMessages.required, required)
          },
          address: {
            required: helpers.withMessage(this.ErrorMessages.required, required)
          },
          addressPost: {
            required: helpers.withMessage(this.ErrorMessages.required, required)
          },
        }
      },
    }
  },
  methods: {
    handleSubmit(): void {
      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)
        this.v$.$reset()
        this.$services.updateProfile(this.formModel, this.getAuthConfig).then((res) => {
          this.$store.commit('mutIsLoading', false)
          if (res.status === this.ERequestStatus.Success) {
            this.$store.commit('mutUserInfo', res)
            this.$store.commit('mutAlertText', 'Данные успешно обновлены')
            this.$store.commit('mutOpenedModalName', null)
          } else {
            this.$store.commit('mutAlertText', 'Ошибка при обновлении данных')
            this.$store.commit('mutOpenedModalName', null)
          }
        })
      }
    },

    fillOrganizationInfo(selectedOrganization: ISuggestion): void {
      this.formModel.info.fullTitle = selectedOrganization.value
      this.formModel.info.inn = selectedOrganization.data.inn
      this.formModel.info.kpp = selectedOrganization.data.kpp
      this.formModel.info.address = selectedOrganization.data.address.value
      this.formModel.info.addressPost = selectedOrganization.data.address.value
    },

    fillBankInfo(selectedBank: ISuggestion) {
      this.formModel.info.bank = selectedBank.value
      this.formModel.info.correspondent_account = selectedBank.data.correspondent_account
    }
  },

  computed: {
    ...mapGetters(['getUserInfo', 'getAuthConfig', 'getIsLoading'])
  },

  mounted() {
    this.formModel.info.account = this.getUserInfo.info?.account
    this.formModel.info.address = this.getUserInfo.info?.address
    this.formModel.info.addressPost = this.getUserInfo.info?.addressPost
    this.formModel.info.bank = this.getUserInfo.info?.bank
    this.formModel.info.bic = this.getUserInfo.info?.bic
    this.formModel.info.inn = this.getUserInfo.info?.inn
    this.formModel.info.kpp = this.getUserInfo.info?.kpp
    this.formModel.info.ogrn = this.getUserInfo.info?.ogrn
    this.formModel.info.correspondent_account = this.getUserInfo.info?.correspondent_account
    this.formModel.info.fullTitle = this.getUserInfo.info?.fullTitle
  }
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
