<template>
  <div class="flightRegTitle">
    <!-- Если не указано транспортное судно -->
    <h2 class="h2" v-if="!getAircraftInfo.first_part.aircraft.type">
      {{ getAircraftInfo.first_part.from.name }}
      —
      {{ getAircraftInfo.first_part.to.name }}
    </h2>
    <template v-else>
      <h2 class="h2">
        {{ getAircraftInfo.first_part.from.name }}
      </h2>
      <FlightRegCapacity :content="getAircraftInfo.first_part" />
      <!-- Если маршрут с двумя точками -->
      <h2 class="h2">
        {{ getAircraftInfo.first_part.to.name }}
      </h2>
      <!-- Если маршрут с тремя точками -->
      <template v-if="getAircraftInfo.second_part">
        <FlightRegCapacity :content="getAircraftInfo.first_part" />
        <h2 class="h2">
          {{ getAircraftInfo.second_part.to.name }}
        </h2>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import FlightRegCapacity from '../FlightRegCapacity/FlightRegCapacity.vue'

export default defineComponent({
  components: { FlightRegCapacity },
  name: 'FlightRegTitle',
  computed: {
    ...mapGetters(['getAircraftInfo'])
  }
})
</script>

<style scoped lang="scss">
@import 'FlightRegTitle';
</style>
