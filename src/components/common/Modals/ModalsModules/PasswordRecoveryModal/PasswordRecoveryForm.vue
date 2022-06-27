<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Восстановление пароля</h2>
    <p class="forms__common-text">Мы пришлем ссылку для сброса пароля.</p>
    <div class="forms__content">
      <Input
        v-model:inputModel="formModel.login"
        label="Эл. почта"
        :isError="isFieldError(v$.formModel.$errors, 'login')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'login') || onRequestErrorMessage"
      />
    </div>
    <Button
      kind="Primary"
      :isFluid="true"
      className="forms__submit-btn"
      @click="handleSubmit"
    >
      Сбросить пароль
    </Button>
    <Button
      kind="Unstyled"
      className="forms__subbtn"
      :isFluid="true"
      @click="switchToLogIn"
      :isDisabled="getIsLoading"
    >
      Вход
    </Button>
  </form>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Input from '@ui/Input/Input.vue'
import Button from '@ui/Button/Button.vue'
import useVuelidate from '@vuelidate/core'
import {
  // and,
  email,
  helpers,
  required,
} from '@vuelidate/validators'
import { formMixin } from '@/mixins/formMixin'
import { IPasswordRecoveryForm } from '@/models/forms/authForms'

interface IData {
  formModel: IPasswordRecoveryForm,
  onRequestErrorMessage: string,
}

export default defineComponent({
  name: 'PasswordRecoveryForm',
  components: {
    Button,
    Input,
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },
  data: (): IData => {
    return {
      formModel: {
        login: '',
      },
      onRequestErrorMessage: '',
    }
  },
  validations() {
    return {
      formModel: {
        login: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          email: helpers.withMessage(this.ErrorMessages.emailFormat, email),
          // check for existing user
        },
      },
    }
  },
  methods: {
    switchToLogIn(): void {
      this.$store.commit('mutOpenedModalName', this.EModalsNames.LogInModal)
    },

    handleSubmit(): void {
      this.onRequestErrorMessage = ''
      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)
        this.v$.$reset()
        this.$services.recoveryRequest(this.formModel).then((res) => {
          this.$store.commit('mutIsLoading', false)
          if (res.status === this.ERequestStatus.Success) {
            this.$emit('onRecoverySuccess')
            return
          }
          if (res.statusCode === 422) {
            this.onRequestErrorMessage = this.ErrorMessages.userNotFound
          }
        })
      }
    }
  },

  watch: {
    formModel: {
      handler() {
        this.onRequestErrorMessage = ''
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
