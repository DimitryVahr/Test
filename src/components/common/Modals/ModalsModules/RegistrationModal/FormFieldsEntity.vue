<template>
  <p class="forms__common-text">
    Если планируете лететь как частное лицо, <a class="global_link" @click="switchToRegEntity">зарегистрируйтесь как Физ. лицо</a>
  </p>
  <div class="forms__content">
    <Input
      v-model:inputModel="formModel.title"
      label="Сокращенное название компании"
      :isError="isFieldError(v$.formModel.$errors, 'title')"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'title')"
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
    <Input
      v-model:inputModel="formModel.email"
      label="Эл. почта"
      :isError="isFieldError(v$.formModel.$errors, 'email')"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'email') || onRegistrationErrors.emailTaken"
    />
    <Input
      v-model:inputModel="formModel.phone"
      :mask="MaskRegExps.phone"
      label="Телефон"
      :isError="isFieldError(v$.formModel.$errors, 'phone')"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'phone')"
      autocomplete="tel"
    />
    <InputPassword
      v-model:inputModel="formModel.password"
      :passwordHint="ErrorMessages.passwordLength"
      label="Придумайте пароль"
      :isError="isFieldError(v$.formModel.$errors, 'password')"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'password')"
      autocomplete="new-password"
    />
  </div>
  <div v-if="formModel.info.ogrn" class="forms__content">
    <p class="forms__common-text"><b>Пожалуйста, проверьте реквизиты организации</b></p>
    <Input
      v-model:inputModel="formModel.info.fullTitle"
      label="Название"
      :isError="isFieldError(v$.formModel.$errors, 'fullTitle')"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'fullTitle')"
    />
    <div class="forms__grid forms__grid_two">
      <Input
        v-model:inputModel="formModel.info.inn"
        label="ИНН"
        :mask="MaskRegExps.inn"
        :isError="isFieldError(v$.formModel.$errors, 'inn')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'inn')"
      />
      <Input
        v-model:inputModel="formModel.info.kpp"
        label="КПП"
        :mask="MaskRegExps.kpp"
        :isError="isFieldError(v$.formModel.$errors, 'kpp')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'kpp')"
      />
    </div>
    <InputAutocomplete
      v-model:inputModel="formModel.info.bic"
      label="БИК"
      :isError="isFieldError(v$.formModel.$errors, 'bic')"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'bic')"
      :autocompleteConfig="{
        apiEndpointName: 'suggestBank',
        count: 5,
        subfield: 'bic'
      }"
      @onSelect="fillBankInfo"
    />
    <Input
      v-model:inputModel="formModel.info.account"
      label="Расчетный счет"
      :mask="MaskRegExps.account"
      :isError="isFieldError(v$.formModel.$errors, 'account')"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'account')"
    />
    <Textarea
      v-model:textareaModel="formModel.info.bank"
      label="Наименование банка"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'bank')"
    />
    <Textarea
      v-model:textareaModel="formModel.info.address"
      label="Юридический адрес"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'address')"
    />
    <Textarea
      v-model:textareaModel="formModel.info.addressPost"
      label="Почтовый адрес"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'addressPost')"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import useVuelidate from '@vuelidate/core'
import {
  email,
  helpers,
  minLength,
  required,
} from '@vuelidate/validators'
import { formMixin } from '@/mixins/formMixin'
import InputPassword from '@/components/ui/Input/InputPassword.vue'
import { IRegistrationEntityForm, ISuggestion } from '@/models/forms/authForms'
import Input from '@/components/ui/Input/Input.vue'
import InputAutocomplete from '@/components/shared/InputAutocomplete/InputAutocomplete.vue'
import Textarea from '@/components/ui/Textarea/Textarea.vue'
import { IOnRegistrationErrorMessages } from './types'

interface IData {
  formValue: null | IRegistrationEntityForm,
}

export default defineComponent({
  name: 'RegistrationForm',
  components: {
    InputPassword,
    Input,
    InputAutocomplete,
    Textarea,
  },
  props: {
    formModel: {
      required: true,
      type: Object as PropType<IRegistrationEntityForm>
    },

    onRegistrationErrors: {
      required: false,
      type: Object as PropType<IOnRegistrationErrorMessages>,
      default() {
        return {}
      }
    }
  },
  emits: ['update:formModel', 'onSwitchRegType'],
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },
  data: (): IData => {
    return {
      formValue: null,
    }
  },
  validations() {
    return {
      formModel: {
        title: {
          required: helpers.withMessage(this.ErrorMessages.required, required)
        },
        info: {
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
          account: {
            fieldLength: helpers.withMessage(this.ErrorMessages.fieldDigits, helpers.regex(this.FormRegExps.account)),
            reuired: helpers.withMessage(this.ErrorMessages.required, required)
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
        },
        email: {
          email: helpers.withMessage(this.ErrorMessages.emailFormat, email),
          required: helpers.withMessage(this.ErrorMessages.required, required)
        },
        phone: {
          phoneFormat: helpers.withMessage(this.ErrorMessages.phoneLength, helpers.regex(this.FormRegExps.phone)),
          required: helpers.withMessage(this.ErrorMessages.required, required)
        },
        password: {
          minLength: helpers.withMessage(this.ErrorMessages.passwordLength, minLength(6)),
          required: helpers.withMessage(this.ErrorMessages.required, required),
        },
      },
    }
  },
  watch: {
    formModel() {
      this.formValue = this.formModel
    },
    formValue() {
      this.$emit('update:formModel', this.formValue)
    }
  },
  methods: {
    switchToRegEntity() {
      this.$emit('onSwitchRegType')
    },

    fillOrganizationInfo(selectedOrganization: ISuggestion) {
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
  mounted() {
    this.formValue = this.formModel
  }
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
