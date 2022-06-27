<template>
  <div>
    <h2 class="accountTabs__titleMain">Бонусы</h2>
    <AccountTabsNotification v-if="!getUserInfo.bonus"
      title="Заполните профиль, чтобы оплачивать полёты бонусами"
      text="Вы&nbsp;получите персональный бонусный счет. С&nbsp;ним вы&nbsp;сможете накапливать бонусы
          и&nbsp;тратить их&nbsp;на&nbsp;новые полеты. Бонусы начисляются в&nbsp;размере&nbsp;10% от&nbsp;стоимости
          билета.">

      <div class="accountBonusesBtns">
        <Button kind="Link" className="userAccount_textLinkThin" class="accountBonusesBtns__loyaltyBtn">
          Подробнее о&nbsp;программе лояльности
        </Button>
        <Button kind="Primary" :is-fluid-mobile="true" @click="switchToModal(EModalsNames.ProfileUpdateModal)">
          Заполнить профиль
        </Button>
      </div>
    </AccountTabsNotification>

    <AccountTabsNotification v-else-if="!getBonusesTransactions.length"
      title="У вас пока нет бонусов"
      text="Бонусы начисляются в размере 10% от&nbsp;стоимости билета после совершения перелёта. Бонусами можно оплатить весь билет или его часть, начиная с&nbsp;третьего полёта.">

      <div class="accountBonusesBtns">
        <Button kind="Link" className="userAccount_textLinkThin" class="accountBonusesBtns__loyaltyBtn">
          Подробнее о&nbsp;программе лояльности
        </Button>
      </div>
    </AccountTabsNotification>

    <AccountBonusesTable v-else />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import AccountBonusesTable from '@common/UserAccount/AccountTabs/AccountBonuses/AccountBonusesTable/AccountBonusesTable.vue'
import AccountTabsNotification from '@common/UserAccount/AccountTabs/AccountTabsNotification.vue'
import { mapGetters } from 'vuex'
import { EModalsNames } from '@/models/modals'

export default defineComponent({
  name: 'AccountBonuses',
  components: { AccountTabsNotification, AccountBonusesTable, Button },
  computed: {
    ...mapGetters(['getUserInfo', 'getBonusesTransactions']),
  },
  methods: {
    switchToModal(modalName: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalName)
    },
  }
})
</script>

<style scoped lang='scss'>
  @import '../AccountTabs';
  @import 'AccountBonuses';
  @import '../../UserAccount';
</style>
