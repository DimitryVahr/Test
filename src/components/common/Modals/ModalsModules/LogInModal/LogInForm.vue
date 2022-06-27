<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Вход</h2>
    <div class="forms__content">
      <Input
        v-model:inputModel="formModel.login"
        label="Эл. почта"
        :isError="isFieldError(v$.formModel.$errors, 'login')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'login') || onLoginErrorMessage"
      />
      <InputPassword
        v-model:inputModel="formModel.password"
        label="Пароль"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'password') || onLoginErrorMessage"
      />
      <div class="forms__wrapper_right">
        <Button
          kind="Unstyled"
          type="button"
          className="forms__btn_blue_small"
          @click="switchToModal(EModalsNames.PasswordRecoveryModal)"
        >
          Не помню пароль
        </Button>
      </div>
    </div>
    <Button
      kind="Primary"
      :isFluid="true"
      className="forms__submit-btn"
      @click="handleSubmit"
      :isDisabled="getIsLoading"
    >
      Войти
    </Button>
    <Button
      kind="Unstyled"
      type="button"
      className="forms__subbtn"
      :isFluid="true"
      @click="switchToModal(EModalsNames.RegistrationModal)"
    >
      Регистрация
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
import { ILogInForm } from '@/models/forms/authForms'
import InputPassword from '@/components/ui/Input/InputPassword.vue'
import { EModalsNames } from '@/models/modals'
import { ERequestStatus } from '@/models/status'

interface IData {
  formModel: ILogInForm,
  onLoginErrorMessage: string,
}

export default defineComponent({
  name: 'LogInForm',
  components: {
    Button,
    Input,
    InputPassword,
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },
  data: (): IData => {
    return {
      formModel: {
        login: '',
        password: '',
      },
      onLoginErrorMessage: '',
    }
  },
  validations() {
    return {
      formModel: {
        login: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          email: helpers.withMessage(this.ErrorMessages.emailFormat, email),
        },
        password: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
        },
      },
    }
  },
  methods: {
    switchToModal(modalName: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalName)
    },

    handleSubmit(): void {
      this.onLoginErrorMessage = ''
      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)
        this.v$.$reset()
        this.$services.login(this.formModel).then((res) => {
          this.$store.commit('mutIsLoading', false)
          if (res.status === this.ERequestStatus.Success) {
            this.$store.commit('mutAuthKey', res.authKey)
            this.$store.commit('mutOpenedModalName', null)

            if (res.authKey) {
              localStorage.setItem('authKey', res.authKey)
              this.$services.getUserInfo({
                headers: {
                  Authorization: `Bearer ${res.authKey}`,
                }
              }).then((resp) => {
                this.$store.commit('mutUserInfo', resp)
                this.$services.getBonus({
                  headers: {
                    Authorization: `Bearer ${res.authKey}`,
                  }
                })
                  .then((bonusRes) => {
                    if (bonusRes.status === ERequestStatus.Success) {
                      this.$store.commit('mutBonusesInfo', bonusRes)
                    } else {
                      this.$store.commit('mutAlertText', 'Ошибка получения информации о бонусах')
                    }
                  })
              })
            }
          }
          if (res.statusCode === 401) {
            this.onLoginErrorMessage = this.ErrorMessages.loginOrPassword
          }
        })
      }
    }
  },

  watch: {
    formModel: {
      handler() {
        this.onLoginErrorMessage = ''
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
