<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Придумайте новый пароль</h2>
    <div class="forms__content">
      <InputPassword
        v-model:inputModel="formModel.password"
        label="Пароль"
        :isError="isFieldError(v$.formModel.$errors, 'password')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'password') || onResetErrorMessages"
      />
    </div>
    <Button
      kind="Primary"
      :isFluid="true"
      className="forms__submit-btn"
      @click="handleSubmit"
      :isDisabled="getIsLoading"
    >
      Сохранить пароль
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
  minLength,
  required,
} from '@vuelidate/validators'
import { formMixin } from '@/mixins/formMixin'
import { INewPasswordForm } from '@/models/forms/authForms'
import InputPassword from '@/components/ui/Input/InputPassword.vue'

interface IData {
  formModel: INewPasswordForm,
  onResetErrorMessages: string,
}

export default defineComponent({
  name: 'NewPasswordForm',
  components: {
    Button,
    InputPassword,
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },
  data: (): IData => {
    return {
      formModel: {
        code: '',
        password: '',
        userId: '',
      },
      onResetErrorMessages: ''
    }
  },
  validations() {
    return {
      formModel: {
        password: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          minLength: helpers.withMessage(this.ErrorMessages.passwordLength, minLength(6)),
        },
      },
    }
  },
  methods: {
    handleSubmit(): void {
      this.onResetErrorMessages = ''
      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)
        this.v$.$reset()
        this.$services.recoveryReset(this.formModel).then((res) => {
          this.$store.commit('mutIsLoading', false)
          if (res.status === this.ERequestStatus.Success) {
            this.$emit('onSetNewPasswordSuccess')
            return
          }
          if (res.statusCode === 422) {
            this.onResetErrorMessages = this.ErrorMessages.passwordAlreadyResetOrTimeout
          }
        })
      }
    }
  },

  watch: {
    formModel: {
      handler() {
        this.onResetErrorMessages = ''
      },
      deep: true,
    }
  },

  computed: {
    ...mapGetters(['getIsLoading'])
  }
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
