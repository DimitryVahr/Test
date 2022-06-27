<template>
  <Container class="flightRegTariffs__container">
    <p
      class="flightRegTariffs__empty"
      v-if="!isFlightRegTariffsFormFilled"
    >
      Заполните форму. <br />
      Тарифы загрузятся автоматически.
    </p>
    <template v-else-if="!isEmpty(getAircraftInfo)">
      <div class="flightRegTariffs__header">
        <FlightRegTitle />
        <Toggler
          v-model:togglerModel="isPayingWithBonuses"
          label="Оплатить баллами"
          id="payWithBonuses"
        >
          <template v-if="!getAuthKey" v-slot:tipOnTrue>
            <div class="flightRegTariffs__login">
              <p>Чтобы оплатить билеты баллами, войдите на&nbsp;сайт.</p>
              <Button kind="Primary" :isFluid="true" @click="login">
                Войти
              </Button>
            </div>
          </template>
        </Toggler>
      </div>
      <div class="flightRegTariffs__grid">
        <FlightRegTariffCard
          v-for="(card, i) in tariffsCards"
          :key="card.passengerType + i"
          :content="card"
          v-model:totalPassengers="totalPassengers"
          :disabled="!getAuthKey && isPayingWithBonuses"
        />
      </div>
      <div class="flightRegTariffs__submit" v-if="passengersCount > 0">
        <div>
          <Button
            kind="Primary"
            :isFluid="true"
            :isDisabled="isOnlyInfant || (isPayingWithBonuses && !getAuthKey)"
            @click="submitTariffs"
          >
            <div class="flightRegTariffs__info">
              <b class="flightRegTariffs__total">
                {{ $utils.formatNumber(priceCount) }}
              </b>
              <span class="flightRegTariffs__amount">
                {{ $utils.formatSimpleWord(passengersCount, 'пассажир') }}
              </span>
            </div>
            <div class="flightRegTariffs__continue">
              <span>Далее</span>
              <Icon :width="24" :height="24" :name="EIconNames.ArrowRight" />
            </div>
          </Button>
          <span
            class="flightRegTariffs__error"
            v-if="passengersCount !== 0 && isOnlyInfant"
          >
            Выберите сопровождающего для
            {{ passengersCount === 1 ? 'ребенка' : 'детей' }}
          </span>
        </div>
      </div>
    </template>
    <div class="flightRegTariffs__loading" v-else>
      <Icon :width="48" :height="48" :name="EIconNames.Propeller" />
      <p>Загружаем тарифы...</p>
    </div>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { isEmpty } from 'lodash'
import Container from '@shared/Container/Container.vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import Toggler from '@ui/Toggler/Toggler.vue'
import FlightRegTariffCard from './FlightRegTariffCard/FlightRegTariffCard.vue'
import { ITariffCard, TTariffTotalPassengers } from './types'
import { TFlightRegPassenger } from '@/models/flightRegistration/flightReg'
import FlightRegTitle from './FlightRegTitle/FlightRegTitle.vue'
import { EFlightRegStages } from '@/models/flightRegistration/regSteps'
import { ISmallOrderForm } from '@/models/forms/orderForms'

interface IData {
  totalPassengers: TTariffTotalPassengers
  isPayingWithBonuses: boolean
}

export default defineComponent({
  name: 'FlightRegTariffs',
  components: {
    Container,
    FlightRegTariffCard,
    Button,
    Icon,
    Toggler,
    FlightRegTitle
  },
  data(): IData {
    return {
      totalPassengers: {
        adult: 0,
        adultLocal: 0,
        adultForeign: 0,
        child: 0,
        childForeign: 0,
        infant: 0
      },
      isPayingWithBonuses: false
    }
  },

  methods: {
    isEmpty,
    defineTip(passengerType: TFlightRegPassenger): string {
      switch (passengerType) {
        case 'adultLocal':
          return 'При регистрации на рейс нужно предъявить паспорт с регистрацией в Камчатском крае'
        case 'child':
          return 'При регистрации на рейс нужно предъявить документ, подтверждающий гражданство РФ'
        case 'infant':
          return 'Ребенок летит бесплатно, если сидит на коленях сопровождающего, не занимая отдельного места'
        default:
          return ''
      }
    },

    login(): void {
      this.$store.commit('mutOpenedModalName', this.EModalsNames.LogInModal)
    },

    submitTariffs(): void {
      this.$store.commit('mutFlightInfo', {
        from: this.getDestinationInfo.placeFrom.title,
        to: this.getDestinationInfo.placeTo.title,
        dateTo: this.getPassengerFormSmall.dateFrom,
        dateBack: this.getPassengerFormSmall.dateTo,
        passengers: this.selectedPassengersTypes,
        totalPrice: this.priceCount,
        isPayingWithBonuses: this.isPayingWithBonuses
      })
      this.$store.commit('mutFlightRegStep', EFlightRegStages.Passengers)
    }
  },

  computed: {
    ...mapGetters([
      'getDestinationInfo',
      'getAuthKey',
      'getAircraftInfo',
      'getPassengerFormSmall'
    ]),
    tariffsCards(): ITariffCard[] {
      return Object.entries(this.getDestinationInfo.price).map(
        ([passengerType, price]) => {
          return {
            passengerType,
            price,
            tip: this.defineTip(passengerType as TFlightRegPassenger)
          } as ITariffCard
        }
      )
    },

    passengersCount(): number {
      return Object.values(this.totalPassengers).reduce((a, b) => a + b)
    },

    priceCount(): number {
      const datesAmount = this.getPassengerFormSmall.dateTo ? 2 : 1
      return this.tariffsCards
        .map(
          (card) => card.price * datesAmount * this.totalPassengers[card.passengerType]
        )
        .reduce((a, b) => a + b)
    },

    isOnlyInfant(): boolean {
      return this.passengersCount === this.totalPassengers.infant
    },

    selectedPassengersTypes(): TFlightRegPassenger[] {
      let result = [] as TFlightRegPassenger[]
      Object.keys(this.totalPassengers).forEach((key) => {
        result = result.concat(
          Array(this.totalPassengers[key as TFlightRegPassenger]).fill(key)
        )
      })
      return result
    },

    computedFormSmall(): ISmallOrderForm {
      return { ...this.getPassengerFormSmall }
    },

    isFlightRegTariffsFormFilled(): boolean {
      return (
        this.getPassengerFormSmall.arrivalCity
        && this.getPassengerFormSmall.departureCity
        && this.getPassengerFormSmall.dateFrom
      )
    }
  },

  watch: {
    computedFormSmall: {
      deep: true,
      handler(newValue, oldValue) {
        if (
          newValue.arrivalCity !== oldValue.arrivalCity
          || newValue.departureCity !== oldValue.departureCity
        ) {
          this.totalPassengers = {
            adult: 0,
            adultLocal: 0,
            adultForeign: 0,
            child: 0,
            childForeign: 0,
            infant: 0
          }
        }
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import 'FlightRegTariffs';
</style>
