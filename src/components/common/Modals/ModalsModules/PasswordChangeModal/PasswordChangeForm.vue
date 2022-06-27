<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Изменение пароля</h2>
    <div class="forms__content">
      <InputPassword
        v-model:inputModel="formModel.password"
        label="Старый пароль"
        :isError="isFieldError(v$.formModel.$errors, 'password')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'password')"
        @onChange="handleOldInputChange()"
      />
      <InputPassword
        v-model:inputModel="formModel.newPassword"
        label="Новый пароль"
        passwordHint="Не менее 6 символов"
        :isError="isFieldError(v$.formModel.$errors, 'newPassword')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'newPassword')"
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
import { defineComponent, toRef } from 'vue'
import Button from '@ui/Button/Button.vue'
import useVuelidate from '@vuelidate/core'
import {
  helpers, minLength, not,
  required, sameAs,
} from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import { formMixin } from '@/mixins/formMixin'
import InputPassword from '@/components/ui/Input/InputPassword.vue'
import { IChangePasswordForm } from '@/models/forms/passwordForms'

interface IData {
  formModel: IChangePasswordForm,
  isWrongPassword: boolean
}

export default defineComponent({
  name: 'PasswordChangeForm',
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
        password: '',
        newPassword: ''
      },
      isWrongPassword: false,
    }
  },
  computed: {
    ...mapGetters([
      'getAuthKey',
      'getIsLoading'
    ])
  },
  validations() {
    return {
      formModel: {
        password: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          minLength: helpers.withMessage(this.ErrorMessages.passwordLength, minLength(6)),
          wrongAfterApiCheck: helpers.withMessage(this.ErrorMessages.wrongPassword, () => !this.isWrongPassword)
        },
        newPassword: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          minLength: helpers.withMessage(this.ErrorMessages.passwordLength, minLength(6)),
          notSameAs: helpers.withMessage(this.ErrorMessages.notSameAsOldPassword, not(sameAs(toRef(this.formModel, 'password'))))
        }
      },
    }
  },
  methods: {
    handleOldInputChange(): void {
      this.isWrongPassword = false
    },
    handleSubmit(): void {
      if (!this.getAuthKey) {
        this.$store.commit('mutAlertText', 'Вы не авторизованы. Смена пароля невозможна')
        return
      }

      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)

        this.$services.checkPassword(this.formModel, {
          headers: {
            Authorization: `Bearer  ${ this.getAuthKey }`
          }
        })
          .then((res) => {
            this.$store.commit('mutIsLoading', false)
            if (res.status === this.ERequestStatus.Success) {

              this.$services.changePassword(this.formModel, {
                headers: {
                  Authorization: `Bearer  ${ this.getAuthKey }`
                }
              })
                .then((changeRes) => {
                  if (changeRes.status === this.ERequestStatus.Success) {
                    this.formModel = {} as IChangePasswordForm
                    this.v$.$reset()
                    this.$emit('onChangePasswordSuccess')
                  } else {
                    this.$store.commit('mutAlertText', 'Ошибка при смене пароля. Попробуйте позже')
                  }
                })

            } else {
              // Если с бэка приходит ошибка при проверке пароля
              this.isWrongPassword = true
            }
          })
      }
    },
  },
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
