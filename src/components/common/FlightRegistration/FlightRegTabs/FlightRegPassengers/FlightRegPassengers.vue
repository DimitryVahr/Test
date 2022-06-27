<template>
  <Container>
    <div class="flightRegPassengers__content">
      <div class="flightRegPassengers__info">
        <ShortFlightInfo />
        <FillingForm />
      </div>
      <FlightRegForm />
    </div>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import ShortFlightInfo from '@common/FlightRegistration/FlightRegTabs/FlightRegPassengers/ShortFlightInfo/ShortFlightInfo.vue'
import FillingForm from '@common/FlightRegistration/FlightRegTabs/FlightRegPassengers/FillingForm/FillingForm.vue'
import FlightRegForm from './FlightRegForm/FlightRegForm.vue'

export default defineComponent({
  name: 'FlightRegPassengers',
  components: {
    Container,
    FillingForm,
    ShortFlightInfo,
    FlightRegForm
  },
})
</script>

<style scoped lang="scss">
@import 'FlightRegPassengers';
</style>
