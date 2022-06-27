<template>
  <form class="flightRegForm" @submit.prevent="handleSubmit">
    <FlightRegItemPassenger
      v-for="(passenger, i) in formPassengers"
      :key="i"
      :passengerType="getFlightInfoPassengers[i]"
      :formId="getFlightRegFormsStatuses[i].formId"
      v-model:formModel="formPassengers[i]"
      :selectedPassengersIds="{ index: i, ids: selectedPassengersIds }"
    />
    <FlightRegItemBonuses
      v-if="getFlightInfo.isPayingWithBonuses"
      v-model:formModel="formBonuses"
    />
    <FlightRegItemUser v-model:formModel="formUser" />
    <Button class="flightRegForm__submit" kind="Primary" :isDisabled="areAllStatusesSuccess || getIsLoading" :isFluid="true">
      Записать на рейс
    </Button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { isEmpty } from 'lodash'
import useVuelidate from '@vuelidate/core'
import Button from '@ui/Button/Button.vue'
import FlightRegItemPassenger from './FlightRegItemPassenger.vue'
import FlightRegItemUser from './FlightRegItemUser.vue'
import FlightRegItemBonuses from './FlightRegItemBonuses.vue'
import { IFlightRegPassenger, IFlightRegUser } from '../types'
import {
  IFormattedSection,
  TFlightRegPassenger,
  IFlightRegFormStatus
} from '@/models/flightRegistration/flightReg'
import { IFlightRegSubmit } from '@/models/flightRegistration/api'
import { ERequestStatus } from '@/models/status'
import { EFlightRegStages } from '@/models/flightRegistration/regSteps'

interface IData {
  formPassengers: IFlightRegPassenger[]
  formUser: IFlightRegUser
  formBonuses: number
}

export default defineComponent({
  name: 'FlightRegForm',
  components: {
    Button,
    FlightRegItemPassenger,
    FlightRegItemUser,
    FlightRegItemBonuses
  },
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },

  data(): IData {
    return {
      formPassengers: [],
      formUser: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        type: 1
      },
      formBonuses: 0
    }
  },

  methods: {
    handleSubmit(): void {
      this.v$.$touch()
      if (!this.v$.$error) {
        this.$store.commit('mutIsLoading', true)
        this.v$.$reset()
        if (this.formBonuses) {
          this.$store.commit('mutFlightInfo', {
            ...this.getFlightInfo,
            bonusPaying: this.formBonuses
          })
        }
        this.$services.submitFlight(this.requestBody).then((res) => {
          this.$store.commit('mutIsLoading', false)
          if (res.status === ERequestStatus.Success) {
            this.$store.commit('mutFlightRegStep', EFlightRegStages.Success)
            return
          }
          if (res.status === ERequestStatus.Error) {
            this.$store.commit('mutAlertText', 'Ошибка записи на рейс')
          }
        })
      }
    }
  },

  computed: {
    ...mapGetters([
      'getUserInfo',
      'getBonusesInfo',
      'getFlightInfoPassengers',
      'getFlightRegFormsStatuses',
      'getFlightInfo',
      'getDestinationInfo',
      'getSections',
      'getSectionRecord',
      'getIsLoading'
    ]),

    selectedPassengersIds(): (number | null)[] {
      return this.formPassengers.map((passenger) => {
        return passenger.id > 0 ? passenger.id : null
      })
    },

    requestBody(): IFlightRegSubmit {
      const destinations = this.getSections.find(
        (section: IFormattedSection) => section.id === this.getSectionRecord.fromId
      )?.destinations
      const result: IFlightRegSubmit = {
        itinerary: {
          datefrom: this.getFlightInfo.dateTo,
          dateto: this.getFlightInfo.dateBack || null,
          placefrom: {
            destinations,
            ...this.getDestinationInfo.placeFrom
          },
          tariff: this.getDestinationInfo.price,
          placeto: this.getDestinationInfo.placeTo,
          totalPrice: this.getFlightInfo.totalPrice
        },
        passengers: this.formPassengers,
        user: this.formUser
      }
      if (!isEmpty(this.getUserInfo)) {
        result.bonusPaying = this.formBonuses
      }
      return result
    },
    areAllStatusesSuccess(): boolean {
      return this.getFlightRegFormsStatuses.some((item:IFlightRegFormStatus) => {
        return item.status !== 'Success'
      })
    }
  },

  watch: {
    getUserInfo() {
      if (this.getUserInfo) {
        this.formUser = {
          name: this.getUserInfo.name,
          surname: this.getUserInfo.surname,
          phone: this.$utils.formatPhone(this.getUserInfo.phone, true),
          email: this.getUserInfo.email,
          type: this.getUserInfo.type
        }
      }
    }
  },

  created() {
    this.getFlightInfoPassengers.forEach(
      (passenger: TFlightRegPassenger, i: number) => {
        this.formPassengers.push({
          id: -i || 0,
          type: passenger,
          firstName: '',
          lastName: '',
          patronymic: '',
          sex: 0,
          state: 'RUS',
          birthday: '',
          phone: '',
          email: '',
          documentType: 3,
          documentNumber: '',
          isLocal: passenger === 'adultLocal' ? 1 : 0,
          isUserProfile: false,
          bonusCard: '',
          bonusPaying: 0,
          imagesIds: []
        })
      }
    )

    if (this.getUserInfo) {
      this.formUser = {
        name: this.getUserInfo.name,
        surname: this.getUserInfo.surname,
        phone: this.$utils.formatPhone(this.getUserInfo.phone, true),
        email: this.getUserInfo.email,
        type: this.getUserInfo.type
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import 'FlightRegForm';
</style>
