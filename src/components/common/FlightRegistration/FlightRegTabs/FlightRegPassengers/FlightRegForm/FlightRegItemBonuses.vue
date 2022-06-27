<template>
  <div class="flightRegItem flightRegBonuses" id="BonusesForm">
    <h2 class="h2 flightRegBonuses__title">Оплата билета</h2>
    <div class="flightRegItem__block">
      <p class="flightRegItem__text">
        Спишите бонусы в счет оплаты своего билета.<br />
        Стоимость билета:
        <b>
          {{ $utils.formatSimpleWord(getFlightInfo.totalPrice, 'рубль') }}
        </b>
        <br />
        Доступно для списания:
        <b>
          {{ $utils.formatSimpleWord(getBonusesInfo.balance.active, 'бонус') }}
        </b>
      </p>
      <div class="flightRegBonuses__pay">
        <div class="flightRegBonuses__bonus">
          <p class="flightRegItem__text flightRegItem__text_secondary">
            Оплатить бонусами
          </p>
          <Counter
            v-if="bonusesCount !== null"
            class="flightRegBonuses__counter"
            kind="Secondary"
            :step="500"
            :label="$utils.formatSimpleWord(bonusesCount, 'бонус', true)"
            v-model:counterModel="bonusesCount"
            :maxValue="getBonusesInfo.balance.active"
          />
        </div>
        <div>
          <p class="flightRegItem__text flightRegItem__text_secondary">
            Оплатить рублями
          </p>
          <p class="flightRegItem__text flightRegBonuses__rubles">
            <b>{{ $utils.formatSimpleWord(getFlightInfo.totalPrice - bonusesCount, 'рубль') }}</b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapGetters } from 'vuex'
import Counter from '@shared/Counter/Counter.vue'

interface IData {
  bonusesCount: null | number
}

export default defineComponent({
  name: 'FlightRegItemBonuses',
  components: { Counter },
  emits: ['update:formModel'],
  props: {
    /**
     * Значение v-model
     */
    formModel: {
      required: true,
      type: Number as PropType<number>
    }
  },

  data(): IData {
    return {
      bonusesCount: null
    }
  },

  computed: {
    ...mapGetters(['getBonusesInfo', 'getFlightInfo'])
  },

  watch: {
    formModel() {
      this.bonusesCount = this.formModel
    },
    bonusesCount() {
      if (this.bonusesCount && this.bonusesCount > 0) {
        this.$store.commit('mutFlightRegFormStatus', {
          formId: 'BonusesForm',
          formType: 'Bonus',
          status: 'Success'
        })
      } else {
        this.$store.commit('mutFlightRegFormStatus', {
          formId: 'BonusesForm',
          formType: 'Bonus',
          status: 'Normal'
        })
      }
      this.$emit('update:formModel', this.bonusesCount)
    }
  },

  mounted() {
    this.bonusesCount = this.formModel
  }
})
</script>

<style scoped lang="scss">
@import 'FlightRegForm';
</style>
