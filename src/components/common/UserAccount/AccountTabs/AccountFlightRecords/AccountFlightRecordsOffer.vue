<template>
  <div class="accountTabs__tab">
    <h2 class="accountProfile__offerMainTitle  flightRecords__offerMainTitle">Записи на&nbsp;рейс</h2>
    <div class="accountTabs__offerCard accountTabs__section">
      <div class="accountTabs__section flightRecords__section">
        <h3 class="accountTabs__sectionTitle flightRecords__sectionTitle">У&nbsp;вас нет предстоящих полётов</h3>
        <p class="userAccount_textCommonBigger accountTabs__row_desktop">
          Здесь отображаются только те&nbsp;рейсы, на&nbsp;которые вы&nbsp;записались онлайн.
        </p>
      </div>
      <router-link class="flightRecords__button" :to="{name:'FlightRegistration'}">Записаться на рейс</router-link >
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { EModalsNames } from '@/models/modals'

export default defineComponent({
  name: 'AccountFlightRecordsOffer',
  methods: {
    switchToModal(modalName: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalName)
    },
  }
})
</script>

<style scoped lang='scss'>
@import '../../UserAccount';
@import '../AccountTabs';
@import 'AccountFlightRecords';
</style>
