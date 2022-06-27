<template>
  <div class='accountPassengersTable' v-if="getPassengers.length">
    <AccountPassengersTableRow  v-for="tableItem in getPassengers" :content="tableItem" :key="tableItem" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import AccountPassengersTableRow from '@/components/common/UserAccount/AccountTabs/AccountPassengers/AccountPassengersTable/AccountPassengersTableRow/AccountPassengersTableRow.vue'

export default defineComponent({
  name: 'AccountPassengersTable',
  components: {
    AccountPassengersTableRow
  },
  computed: {
    ...mapGetters(['getPassengers']),
  }
})
</script>

<style scoped lang='scss'>
@import 'AccountPassengersTable';
</style>
