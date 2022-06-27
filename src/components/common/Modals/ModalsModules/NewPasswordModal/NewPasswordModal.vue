<template>
  <ModalBase modalImage="SunnySnowyMountain">
    <NewPasswordForm v-if="currentStep === 'NewPasswordForm'" @onSetNewPasswordSuccess="onSetNewPasswordSuccess" />
    <NewPasswordSuccess v-if="currentStep === 'NewPasswordSuccess'" />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import NewPasswordForm
  from '@common/Modals/ModalsModules/NewPasswordModal/NewPasswordForm.vue'
import NewPasswordSuccess
  from '@common/Modals/ModalsModules/NewPasswordModal/NewPasswordSuccess.vue'

type TCurrentStep = 'NewPasswordForm' | 'NewPasswordSuccess'

interface IData {
  currentStep: TCurrentStep
}

export default defineComponent({
  components: { ModalBase, NewPasswordForm, NewPasswordSuccess, },
  name: 'NewPasswordModal',
  data(): IData {
    return {
      currentStep: 'NewPasswordForm'
    }
  },

  methods: {
    onSetNewPasswordSuccess(): void {
      this.currentStep = 'NewPasswordSuccess'
    }
  }
})
</script>
