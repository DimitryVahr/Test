<template>
  <div class="accountBonusesTableItem">
    <span class="accountBonusesTableItem__date">{{content.year}}</span>
    <AccountBonusesTableItemRow v-for="info in content.items" :key="info" :content="info"></AccountBonusesTableItemRow>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import AccountBonusesTableItemRow from '@common/UserAccount/AccountTabs/AccountBonuses/AccountBonusesTable/AccountBonusesTableItem/AccountBonusesTableItemRow/AccountBonusesTableItemRow.vue'

export default defineComponent({
  name: '',
  components: {
    AccountBonusesTableItemRow,
  },
  props: {
    content: {
      type: Object,
      required: true,
    }
  },
})
</script>

<style scoped lang='scss'>
@import 'AccountBonusesTableItem';
</style>
