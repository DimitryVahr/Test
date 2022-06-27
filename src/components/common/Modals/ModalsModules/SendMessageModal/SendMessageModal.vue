<template>
  <ModalBase modalImage="profileUpdateSendMessage">
    <SendMessageForm v-if="currentStep === 'SendMessageForm'" @onSuccessSend="onSuccessSend" />
    <SendMessageSuccess v-if="currentStep === 'SendMessageSuccess'" />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import SendMessageForm from '@common/Modals/ModalsModules/SendMessageModal/SendMessageForm.vue'
import SendMessageSuccess from '@common/Modals/ModalsModules/SendMessageModal/SendMessageSuccess.vue'

type TCurrentStep = 'SendMessageForm' | 'SendMessageSuccess'

interface IData {
  currentStep: TCurrentStep
}

export default defineComponent({
  components: { ModalBase, SendMessageForm, SendMessageSuccess },
  name: 'SendMessageModal',
  data(): IData {
    return {
      currentStep: 'SendMessageForm'
    }
  },

  methods: {
    onSuccessSend() {
      this.currentStep = 'SendMessageSuccess'
    }
  }
})
</script>
