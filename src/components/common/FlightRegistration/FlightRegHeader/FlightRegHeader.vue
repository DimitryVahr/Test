<template>
  <div class="flightRegHeader">
    <Container class="flightRegHeader__container">
      <h2 class="flightRegHeader__title">Записаться на рейс</h2>
      <FlightRegHeaderForm/>
    </Container>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import FlightRegHeaderForm from '@common/FlightRegistration/FlightRegHeader/FlightRegHeaderForm.vue'

export default defineComponent({
  name: 'FlightRegHeader',
  components: { FlightRegHeaderForm, Container }
})
</script>

<style scoped lang='scss'>
@import 'FlightRegHeader';
</style>
