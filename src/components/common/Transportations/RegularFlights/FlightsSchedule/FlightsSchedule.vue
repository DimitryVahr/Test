<template>
  <div class="flightsSchedule">
    <span v-for="(day, i) in daysNames" :key="day + i" class="flightsSchedule__day"  :class="{'flightsSchedule__day--active': schedule.some(index => index - 1 === i) }">{{ day }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { TFlightSchedule } from '../types'

export default defineComponent({
  name: 'FlightsSchedule',
  props: {
    /**
     * Расписание полетов (1 - Пн, 7 - Вс)
     */
    schedule: {
      required: true,
      type: Array as PropType<TFlightSchedule>
    },
  },
  data() {
    return {
      daysNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'FlightsSchedule';
</style>
