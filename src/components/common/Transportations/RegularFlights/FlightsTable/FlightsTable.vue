<template>
  <div class="flightsTable">
    <div class="flightsTable__row flightsTable__row--head">
      <span class="flightsTable__cell">Маршрут</span>
      <span class="flightsTable__cell flightsTable__cell--schedule">Расписание</span>
    </div>
    <div class="flightsTable__row" v-for="(flight, i) in flights" :key="i">
      <span class="flightsTable__cell">{{ flight.route.from }} — {{ flight.route.to }} {{ flight.route.transport ? `(${flight.route.transport})` : '' }}</span>
      <span class="flightsTable__cell flightsTable__cell--schedule">
        <FlightsSchedule :schedule="flight.schedule" />
      </span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import FlightsSchedule from '../FlightsSchedule/FlightsSchedule.vue'
import { IFlight } from '../types'

export default defineComponent({
  components: { FlightsSchedule },
  name: 'FlightsTable',
  props: {
    /**
     * Маршрут и расписание полетов
     */
    flights: {
      required: true,
      type: Array as PropType<IFlight[]>
    },
  }
})
</script>

<style scoped lang='scss'>
@import 'FlightsTable';
</style>
