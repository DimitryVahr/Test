<template>
  <ModalBase
    modalImage="Summer"
  >
    <span>Пассажирские перевозки</span>
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'

export default defineComponent({
  name: 'PassengerTransportationModal',
  components: {
    ModalBase,
  }
})
</script>

<style scoped lang='scss'>
@import 'PassengerTransportationModal';
</style>
