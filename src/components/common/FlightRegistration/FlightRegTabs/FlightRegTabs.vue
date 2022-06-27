<template>
  <div>
    <FlightRegStage v-if="isInfoReady" />
    <transition name="fadeFaster" mode="out-in">
      <component :is="getCurrentRegStep" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { isEmpty } from 'lodash'
import FlightRegTariffs from '@common/FlightRegistration/FlightRegTabs/FlightRegTariffs/FlightRegTariffs.vue'
import FlightRegPassengers from '@common/FlightRegistration/FlightRegTabs/FlightRegPassengers/FlightRegPassengers.vue'
import FlightRegSuccess from '@common/FlightRegistration/FlightRegTabs/FlightRegSuccess/FlightRegSuccess.vue'
import FlightRegStage from '@common/FlightRegistration/FlightRegTabs/FlightRegStage/FlightRegStage.vue'

export default defineComponent({
  name: 'FlightRegTabs',
  components: {
    FlightRegStage,
    FlightRegSuccess,
    FlightRegPassengers,
    FlightRegTariffs
  },

  computed: {
    ...mapGetters(['getFlightRegStep', 'getAircraftInfo']),
    getCurrentRegStep(): string {
      return `FlightReg${this.getFlightRegStep}`
    },

    isInfoReady(): boolean {
      return !isEmpty(this.getAircraftInfo)
    }
  },
})
</script>

<style scoped lang="scss">
@import 'FlightRegTabs';
</style>
