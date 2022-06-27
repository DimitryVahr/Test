<template>
  <p class="forms__common-text">
    Если планируете оплатить полет как ИП или организация, <a class="global_link" @click="switchToRegEntity">зарегистрируйтесь как Юр. лицо</a>
  </p>
  <div class="forms__content">
    <Input
      v-model:inputModel="formModel.surname"
      label="Фамилия"
      :isError="isFieldError(v$.formModel.$errors, 'surname')"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'surname')"
    />
    <Input
      v-model:inputModel="formModel.name"
      label="Имя"
      :isError="isFieldError(v$.formModel.$errors, 'name')"
      :errorText="getFieldErrorMsg(v$.formModel.$errors, 'name')"
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
      id="phone"
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
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import useVuelidate from '@vuelidate/core'
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from '@vuelidate/validators'
import { formMixin } from '@/mixins/formMixin'
import InputPassword from '@/components/ui/Input/InputPassword.vue'
import { IRegistrationIndividualForm } from '@/models/forms/authForms'
import Input from '@/components/ui/Input/Input.vue'
import { IOnRegistrationErrorMessages } from './types'

interface IData {
  formValue: null | IRegistrationIndividualForm,
}

export default defineComponent({
  name: 'RegistrationForm',
  components: {
    InputPassword,
    Input,
  },
  props: {
    formModel: {
      required: true,
      type: Object as PropType<IRegistrationIndividualForm>
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
        surname: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          maxLength: helpers.withMessage(this.ErrorMessages.tooLong, maxLength(50))
        },
        name: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          maxLength: helpers.withMessage(this.ErrorMessages.tooLong, maxLength(50))
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
