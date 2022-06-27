<template>
  <div class="accountBonusesTableItemRow">
    <span class="accountBonusesTableItemRow__date">{{ dateFormater }}</span>
    <Button
      class="accountBonusesTableItemRow__fromTo"
      kind="Unstyled"
      @click="showRecordInfo(content.itinerary.id)"
    >
      {{ content.itinerary.from }} – {{ content.itinerary.to }}
    </Button>
    <span class="accountBonusesTableItemRow__status">{{
      content.status.title
    }}</span>
    <span
      class="accountBonusesTableItemRow__bonuses"
      :class="toggleClassBonuses"
      >{{ addPlusValue }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { format } from 'date-fns'
import { IBonusesTransactionItem } from '@/models/userAccount/api'
import Button from '@/components/ui/Button/Button.vue'
import { EAccountFlightScreens } from '@/models/userAccount/flights'
import { EAccountRoutes } from '@/models/userAccount/router'

export default defineComponent({
  components: { Button },
  name: 'AccountBonusesTableItemRow',
  props: {
    content: {
      type: Object as PropType<IBonusesTransactionItem>,
      required: true
    }
  },

  methods: {
    showRecordInfo(recordId: number): void {
      this.$store.commit('mutSelectedFlightId', recordId)
      this.$router.push(EAccountRoutes.FlightRecords)
      this.$store.commit('mutCurrentFlightScreen', EAccountFlightScreens.AccountFlightRecordsFlight)
    }
  },

  computed: {
    dateFormater() {
      return format(new Date(this.content.date), 'dd.MM.yyyy')
    },

    toggleClassBonuses(): Record<string, boolean> {
      return {
        'accountBonusesTableItemRow__bonuses--paid':
          this.content.status.title === 'Оплачено',
        'accountBonusesTableItemRow__bonuses--accrued':
          this.content.status.title === 'Начислено',
        'accountBonusesTableItemRow__bonuses--wait':
          this.content.status.title === 'Начислится после перелёта',
        'accountBonusesTableItemRow__bonuses--cancel':
          this.content.status.title === 'Перелёт не состоялся'
      }
    },

    addPlusValue() {
      return (this.content.amount > 0 ? '+' : '') + this.content.amount
    }
  }
})
</script>

<style scoped lang="scss">
@import 'AccountBonusesTableItemRow';
</style>
