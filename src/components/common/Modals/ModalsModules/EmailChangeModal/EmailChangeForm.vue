<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Изменение электронной почты</h2>

    <div class="forms__content">
      <Input
        v-model:inputModel="formModel.newEmail"
        label="Эл. почта"
        :isError="isFieldError(v$.formModel.$errors, 'newEmail')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'newEmail')"
      />
    </div>

    <Button
      kind="Primary"
      :isFluid="true"
      :isDisabled="getIsLoading"
      @click="handleSubmit"
    >
      Сохранить
    </Button>
  </form>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'
import Input from '@ui/Input/Input.vue'
import Button from '@ui/Button/Button.vue'
import { mapGetters } from 'vuex'
import { formMixin } from '@/mixins/formMixin'
import { IChangeEmailForm } from '@/models/userAccount/api'
import { ERequestStatus } from '@/models/status'

interface IData {
  formModel: IChangeEmailForm,
}

export default defineComponent({
  name: 'EmailChangeForm',
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
        newEmail: '',
        isMobile: false,
      }
    }
  },
  validations() {
    return {
      formModel: {
        newEmail: {
          newEmail: helpers.withMessage(this.ErrorMessages.emailFormat, email),
          required: helpers.withMessage(this.ErrorMessages.required, required)
        },
      },
    }
  },
  methods: {
    handleSubmit(): void {
      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)
        const formPreparedData: IChangeEmailForm = { ...this.formModel }
        formPreparedData.newEmail = this.formModel.newEmail

        this.$services.changeEmail(formPreparedData, this.getAuthConfig)
          .then((res) => {
            this.$store.commit('mutIsLoading', false)
            if (res.status === ERequestStatus.Success) {
              this.formModel = {} as IChangeEmailForm
              this.v$.$reset()
              this.$emit('onEmailChangeSuccess', formPreparedData.newEmail)
            } else {
              this.$store.commit('mutAlertText', 'Ошибка при попытке сменить электронную почту')
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
