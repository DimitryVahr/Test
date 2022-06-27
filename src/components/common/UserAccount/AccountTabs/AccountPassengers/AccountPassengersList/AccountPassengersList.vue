<template>
  <div>
    <h2 class="accountTabs__titleMain">Пассажиры</h2>
    <AccountPassengersTable v-if="getPassengers.length"/>
    <AccountTabsNotification
      v-else
      title="Добавьте пассажиров"
      text="Добавьте информацию о пассажирах, которые летают вместе с вами, чтобы не вводить их данные каждый раз при записи на рейс.">
      <Button kind="Primary" class="accountPassengers__addPassengerBtn"  @click="openAddPassengerModal">
        <div class="accountPassengers__addPassengerBtnIcon"></div>Добавить пассажира
      </Button>
    </AccountTabsNotification>
    <Button kind="Primary" class="accountPassengers__addPassengerBtnTable" v-if="getPassengers.length" @click="openAddPassengerModal">
        <div class="accountPassengers__addPassengerBtnIcon"></div>Добавить пассажира
    </Button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import AccountPassengersTable from '@common/UserAccount/AccountTabs/AccountPassengers/AccountPassengersTable/AccountPassengersTable.vue'
import AccountTabsNotification from '@common/UserAccount/AccountTabs/AccountTabsNotification.vue'
import Button from '@ui/Button/Button.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'AccountPassengersList',
  components: {
    AccountPassengersTable,
    AccountTabsNotification,
    Button,
  },
  methods: {
    openAddPassengerModal(): void {
      this.$store.commit('mutOpenedModalName', this.EModalsNames.AddPassengerModal)
    },
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
@import 'AccountPassengersList';
@import '../AccountPassengers';
@import '../../AccountTabs';
</style>
