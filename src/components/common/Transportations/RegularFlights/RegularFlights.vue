<template>
  <section class="regularFlights">
    <div>
      <Container>
        <div class="regularFlights__content">
          <div class="regularFlights__info">
            <h2 class="h2">Внутрирегиональные пассажирские перевозки</h2>
            <FlightsTable class="regularFlights__table" :flights="flights" />
          </div>
          <div class="regularFlights__map">
            <Icon class="regularFlights__icon" :width="1032" :height="1431" :name="EIconNames.FlightsMap" />
          </div>
        </div>
      </Container>
    </div>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Container from '@shared/Container/Container.vue'
import Icon from '@ui/Icon/Icon.vue'
import * as _ from 'lodash'
import FlightsTable from './FlightsTable/FlightsTable.vue'
import { IFlight, TFlightSchedule } from './types'

// interface IData {
//   flights: IFlight[],
// }
interface IDestination {
  placeFrom: Record<string, string>
  placeTo: Record<string, string>
  price: Record<string, number>
  timetable: TFlightSchedule
  timetableExcludedDate:unknown[]
  title:string
  tt: Record<string, unknown[]>
}

interface IFlightSection {
  destinations: IDestination[]
  id: number
  shorttitle: string
  title:string
}

export default defineComponent({
  components: {
    Container,
    FlightsTable,
    Icon
  },
  name: 'RegularFlights',
  // data(): IData {
  //   return {
  //     flights: [
  //     ]
  //   }
  // },
  computed: {
    ...mapGetters([
      'getSections'
    ]),
    flights() {
      const scheduleSort: IFlightSection[] = this.getSections.filter((item:IFlightSection) => {
        const isFromEmpty = _.isEmpty(item.destinations[0].placeFrom)
        const isToEmpty = _.isEmpty(item.destinations[0].placeTo)
        if (isFromEmpty && isToEmpty) return false
        return true
      })
      const flightSort: IFlight[] = scheduleSort.map((item:IFlightSection) => {
        const flight: IFlight = {
          route: {
            from: item.destinations[0].placeFrom.title,
            to: item.destinations[0].placeTo.title,
          },
          schedule: item.destinations[0].timetable
        }
        return flight
      })
      return flightSort
    }
  }
})

</script>

<style scoped lang='scss'>
@import 'RegularFlights';
</style>
