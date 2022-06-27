<template>
  <div>
    <transition name="fadeFaster" mode="out-in">
      <component :is="getPassenger === null? 'AccountPassengersList': 'AccountPassengerInfo'"/>
    </transition>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import AccountPassengerInfo from '@common/UserAccount/AccountTabs/AccountPassengers/AccountPassengerInfo/AccountPassengerInfo.vue'
import AccountPassengersList from '@common/UserAccount/AccountTabs/AccountPassengers/AccountPassengersList/AccountPassengersList.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'AccountPassengers',
  components: {
    AccountPassengerInfo,
    AccountPassengersList
  },
  computed: {
    ...mapGetters([
      'getPassenger',
      'getPassengers'
    ]),
  }
})
</script>

<style scoped lang='scss'>
@import 'AccountPassengers';
@import '../AccountTabs';
</style>
