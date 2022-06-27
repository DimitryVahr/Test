<template>
  <div class="flightRegTariffCard" :class="classes">
    <span class="flightRegTariffCard__title">
      {{ cardTitle }}&nbsp;<Icon
        v-if="content.tip !== ''"
        :width="13"
        :height="13"
        :name="EIconNames.ExclamationMarkCircle"
        v-tippy="content.tip"
      />
    <template v-if="cardTitle == 'Взрослый с пропиской в Камчатском крае'">
    <br>
      <small>(или ребенок с 12 до 14 лет)</small>
      <Icon
        v-if="content.tip !== ''"
        :width="13"
        :height="13"
        :name="EIconNames.ExclamationMarkCircle"
        v-tippy="'При регистрации на рейс нужно предъявить документ, подтверждающий гражданство РФ'"
      />
    </template>
    </span>
    <div class="flightRegTariffCard__content">
      <div class="flightRegTariffCard__price">
        <b>
          {{
            tariffPrice > 0
              ? this.$utils.formatNumber(tariffPrice)
              : 'Бесплатно'
          }}
        </b>
        <span v-if="content.price > 0" class="flightRegTariffCard__bonuses">
          Начислим {{ $utils.formatSimpleWord(bonusesAmount, 'бонус') }}
        </span>
      </div>
      <div v-if="passengersAmount === 0" v-tippy="tippyData">
        <Button
          :class="buttonClasses"
          kind="Secondary"
          :isDisabled="
            (isAddDisabled && $utils.getScreenWidth() > 768) || disabled
          "
          @click="selectPassenger"
        >
          Выбрать
        </Button>
      </div>
      <Counter
        v-else
        v-model:counterModel="passengersAmount"
        kind="Primary"
        :label="$utils.formatSimpleWord(passengersAmount, 'билет', true)"
        :minValue="0"
        :maxValue="availablePassengersCount"
        tipOnIncrementDisabled="К сожалению, мест на выбранный рейс больше нет"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapGetters } from 'vuex'
import Button from '@ui/Button/Button.vue'
import Counter from '@shared/Counter/Counter.vue'
import Icon from '@ui/Icon/Icon.vue'
import { ITariffCard, TTariffTotalPassengers } from '../types'

interface IData {
  passengersAmount: number
}

export default defineComponent({
  components: { Button, Counter, Icon },
  name: 'FlightRegTariffCard',
  emits: ['update:totalPassengers'],
  props: {
    /**
     * Контент карточки
     */
    content: {
      required: true,
      type: Object as PropType<ITariffCard>
    },
    /**
     * Информация о количестве пассажиров каждого типа
     */
    totalPassengers: {
      required: true,
      type: Object as PropType<TTariffTotalPassengers>
    },
    /**
     * Неактивное состояние карточки
     */
    disabled: {
      required: false,
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  data(): IData {
    return {
      passengersAmount: 0
    }
  },

  methods: {
    selectPassenger(): void {
      if (this.isAddDisabled && this.$utils.getScreenWidth() < 768) {
        this.$store.commit(
          'mutAlertText',
          'К сожалению, мест на выбранный рейс больше нет'
        )
        return
      }
      this.passengersAmount++
    }
  },

  computed: {
    ...mapGetters(['getAircraftInfo', 'getPassengerFormSmall']),
    cardTitle(): string {
      switch (this.content.passengerType) {
        case 'adult':
          return 'Взрослый'
        case 'adultLocal':
          return 'Взрослый с пропиской в Камчатском крае'
        case 'child':
          return 'Ребенок 2–12 лет\nгражданин РФ'
        case 'childForeign':
          return 'Ребенок 2–12 лет\nиностранный гражданин'
        case 'infant':
          return 'Ребенок до 2 лет\nбез места'
        default:
          return 'Взрослый'
      }
    },

    bonusesAmount(): number {
      return Math.floor(this.content.price / 10)
    },

    classes(): Record<string, boolean> {
      return {
        flightRegTariffCard_active: this.passengersAmount > 0,
        flightRegTariffCard_error:
          this.content.passengerType === 'infant'
          && this.passengersAmount !== 0
          && this.passengersAmount === this.totalPassengersCount,
        flightRegTariffCard_disabled: this.disabled
      }
    },

    buttonClasses(): Record<string, boolean> {
      return {
        flightRegTariffCard__button: true,
        flightRegTariffCard__button_disabled: this.isAddDisabled
      }
    },

    totalPassengersCount(): number {
      return Object.values(this.totalPassengers).reduce((a, b) => a + b)
    },

    availablePassengersCount(): number {
      return (
        this.getAircraftInfo.capacity_available
        - this.totalPassengersCount
        + this.passengersAmount
      )
    },

    tariffPrice(): number {
      const price = !this.getPassengerFormSmall.dateTo
        ? this.content.price
        : this.content.price * 2
      return price
    },

    isAddDisabled(): boolean {
      return this.availablePassengersCount <= 0
    },

    tippyData() {
      return {
        content:
          this.isAddDisabled && this.$utils.getScreenWidth() >= 768
            ? 'К сожалению, мест на выбранный рейс больше нет'
            : ''
      }
    }
  },

  watch: {
    totalPassengers: {
      deep: true,
      handler() {
        this.passengersAmount = this.totalPassengers[this.content.passengerType]
      }
    },

    passengersAmount() {
      this.$emit('update:totalPassengers', {
        ...this.totalPassengers,
        [this.content.passengerType]: this.passengersAmount
      })
    }
  },

  created() {
    this.passengersAmount = this.totalPassengers[this.content.passengerType]
  }
})
</script>

<style scoped lang="scss">
@import 'FlightRegTariffCard';
</style>
