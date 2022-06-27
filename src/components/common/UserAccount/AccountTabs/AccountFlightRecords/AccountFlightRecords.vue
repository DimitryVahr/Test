<template>
  <div>
    <transition name="fadeFaster" mode="out-in">
      <component
        :is="getCurrentFlightScreen"
        @switchFlightScreen="handleSwitchFlightScreen"
      />
    </transition>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import AccountFlightRecordsInfo
  from '@common/UserAccount/AccountTabs/AccountFlightRecords/AccountFlightRecordsInfo.vue'
import AccountFlightRecordsOffer
  from '@common/UserAccount/AccountTabs/AccountFlightRecords/AccountFlightRecordsOffer.vue'
import AccountFlightRecordsFlight
  from '@common/UserAccount/AccountTabs/AccountFlightRecords/AccountFlightRecordsFlight.vue'
import { mapGetters } from 'vuex'
import { EAccountFlightScreens } from '@/models/userAccount/flights'

export default defineComponent({
  name: 'AccountFlightRecords',
  components: {
    AccountFlightRecordsFlight,
    AccountFlightRecordsOffer,
    AccountFlightRecordsInfo
  },
  computed: {
    ...mapGetters([
      'getAuthKey',
      'getFlightRecords',
      'getUserInfo',
      'getCurrentFlightScreen'
    ]),
  },
  methods: {
    handleSwitchFlightScreen(screenName: EAccountFlightScreens) {
      this.$store.commit('mutCurrentFlightScreen', screenName)
    }
  },
})
</script>

<style scoped lang='scss'>
@import 'AccountFlightRecords';
</style>
