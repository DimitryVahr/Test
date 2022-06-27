<template>
  <div class="flightRegCapacity">
    <span class="flightRegCapacity__transport">
      {{ aircraftType }}
      {{ content.aircraft.name }}
    </span>
    <span class="flightRegCapacity__arrow"></span>
    <span class="flightRegCapacity__available">
      {{ formattedCapacityTotal }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IAircraftTransport } from '@/models/flightRegistration/api'

export default defineComponent({
  name: 'FlightRegCapacity',
  props: {
    content: {
      required: true,
      type: Object as PropType<IAircraftTransport>
    }
  },

  computed: {
    aircraftType(): string {
      switch (this.content.aircraft.type) {
        case 'plane':
          return 'Самолет'
        case 'helicopter':
          return 'Вертолет'
        default:
          return 'Вертолет'
      }
    },

    formattedCapacityTotal(): string {
      const amount = this.content.capacity_total
      if (amount % 5 === 0 || (amount % 10 > 5 && amount % 10 < 10)) {
        return `${amount} мест`
      }
      if (amount % 10 === 1) {
        return `${amount} место`
      }
      return `${amount} места`
    }
  }
})
</script>

<style scoped lang="scss">
@import 'FlightRegCapacity';
</style>
