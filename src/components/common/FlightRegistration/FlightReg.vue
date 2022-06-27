<template>
  <FlightRegHeader />
  <FlightRegTabs />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import FlightRegHeader from '@common/FlightRegistration/FlightRegHeader/FlightRegHeader.vue'
import FlightRegTabs from '@common/FlightRegistration/FlightRegTabs/FlightRegTabs.vue'
import { ERequestStatus } from '@/models/status'
import { EFlightRegStages } from '@/models/flightRegistration/regSteps'

export default defineComponent({
  name: 'FlightReg',
  components: { FlightRegTabs, FlightRegHeader },
  computed: {
    ...mapGetters(['getAuthConfig', 'getAuthKey'])
  },

  watch: {
    // Выполняется на вход/выход юзера
    getAuthKey(newKey) {
      // При входе
      if (newKey) {
        // Возвращаем на этап тарифов
        this.$store.commit('mutFlightRegStep', EFlightRegStages.Tariffs)
        // Подгружаем пассажиров
        this.$services.getPassengersInfo(this.getAuthConfig).then((res) => {
          if (res.status === ERequestStatus.Success) {
            this.$store.commit('mutPassengers', res.passengers)
          } else {
            this.$store.commit(
              'mutAlertText',
              'Ошибка при получении информации о пассажирах.'
            )
          }
        })
      } else {
        this.$store.commit('mutPassengers', [])
      }
    }
  },

  created() {
    if (this.getAuthKey) {
      // Вызов апи данных о пассажирах
      this.$services.getPassengersInfo(this.getAuthConfig).then((res) => {
        if (res.status === ERequestStatus.Success) {
          this.$store.commit('mutPassengers', res.passengers)
        } else {
          this.$store.commit(
            'mutAlertText',
            'Ошибка при получении информации о пассажирах.'
          )
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
@import 'FlightReg';
</style>
