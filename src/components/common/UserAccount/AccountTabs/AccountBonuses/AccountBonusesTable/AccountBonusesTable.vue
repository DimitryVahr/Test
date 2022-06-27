<template>
  <div class='accountBonusesTable' v-if="sortedBonuses.length">
    <AccountBonusesTableItem v-for="tableItem in sortedBonuses" :content="tableItem" :key="tableItem"/>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import AccountBonusesTableItem
  from '@common/UserAccount/AccountTabs/AccountBonuses/AccountBonusesTable/AccountBonusesTableItem/AccountBonusesTableItem.vue'
import { mapGetters } from 'vuex'
import { IBonusesTransactionItem } from '@/models/userAccount/api'

interface ISortedBonus {
  year: number,
  items: IBonusesTransactionItem[]
}

export default defineComponent({
  name: 'AccountBonusesTable',
  components: {
    AccountBonusesTableItem,
  },
  computed: {
    ...mapGetters(['getBonusesTransactions']),
    sortedBonuses(): ISortedBonus[] {
      let result = [] as ISortedBonus[]
      const transactions = this.getBonusesTransactions as IBonusesTransactionItem[]
      if (!transactions.length) return []
      let years = transactions.map((item) => new Date(item.date).getFullYear())
      years = [...new Set(years)]
      result = years.map((item) => ({ year: item, items: [] }))

      transactions.forEach((item) => {
        const currentYear = new Date(item.date).getFullYear()
        const yearIndex = years.indexOf(currentYear)
        result[yearIndex].items.push(item)
      })

      return result
    }
  },
})
</script>

<style scoped lang='scss'>
  @import 'AccountBonusesTable';
</style>
