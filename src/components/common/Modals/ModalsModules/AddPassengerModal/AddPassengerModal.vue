<template>
  <ModalBase modalImage="MountainLake">
    <AddPassengerForm />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import AddPassengerForm from './AddPassengerForm.vue'

export default defineComponent({
  components: { ModalBase, AddPassengerForm },
  name: 'AddPassengerModal',
})
</script>
