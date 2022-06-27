<template>
  <ModalBase modalImage="profileUpdateSendMessage">
    <ChangePassengerForm />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import ChangePassengerForm from './ChangePassengerForm.vue'

export default defineComponent({
  components: { ModalBase, ChangePassengerForm },
  name: 'ChangePassengerModal',
})
</script>
