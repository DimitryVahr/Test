<template>
  <ModalBase modalImage="SunnySnowyMountain">
    <PasswordRecoveryForm v-if="currentStep === 'PasswordRecoveryForm'" @onRecoverySuccess="onRecoverySuccess" />
    <PasswordRecoverySuccess v-if="currentStep === 'PasswordRecoverySuccess'" />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import PasswordRecoveryForm
  from '@common/Modals/ModalsModules/PasswordRecoveryModal/PasswordRecoveryForm.vue'
import PasswordRecoverySuccess from './PasswordRecoverySuccess.vue'

type TCurrentStep = 'PasswordRecoveryForm' | 'PasswordRecoverySuccess'

interface IData {
  currentStep: TCurrentStep
}

export default defineComponent({
  components: { ModalBase, PasswordRecoveryForm, PasswordRecoverySuccess },
  name: 'PasswordRecoveryModal',
  data(): IData {
    return {
      currentStep: 'PasswordRecoveryForm'
    }
  },

  methods: {
    onRecoverySuccess(): void{
      this.currentStep = 'PasswordRecoverySuccess'
    }
  }
})
</script>
