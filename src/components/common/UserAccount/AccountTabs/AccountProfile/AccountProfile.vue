<template>
  <div>
    <h2 class="accountTabs__titleMain">{{ isIndividualUser ? 'Профиль' : getUserInfo.title }}</h2>
    <template v-if="isIndividualUser">
      <AccountProfileInfo v-if="getUserInfo.bonus"/>
      <AccountTabsNotification v-else
        title="Заполните профиль, чтобы оплачивать полёты бонусами"
        text="Вы&nbsp;получите персональный бонусный счет. С&nbsp;ним вы&nbsp;сможете накапливать бонусы
            и&nbsp;тратить их&nbsp;на&nbsp;новые полеты. Бонусы начисляются в&nbsp;размере&nbsp;10% от&nbsp;стоимости
            билета.">

        <div class="accountProfileBtns ">
          <Button kind="Link" className="userAccount_textLinkThin" class="accountProfileBtns__loyaltyBtn">
            Подробнее о&nbsp;программе лояльности
          </Button>
          <Button kind="Primary" :is-fluid-mobile="true" @click="switchToModal(EModalsNames.ProfileUpdateModal)">
            Заполнить профиль
          </Button>
        </div>
      </AccountTabsNotification>
    </template>
    <OrganizationInfo v-else />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import AccountProfileInfo
  from '@common/UserAccount/AccountTabs/AccountProfile/AccountProfileInfo.vue'
import { mapGetters } from 'vuex'
import AccountTabsNotification from '@common/UserAccount/AccountTabs/AccountTabsNotification.vue'
import { EModalsNames } from '@/models/modals'
import OrganizationInfo from '../OrganizationInfo/OrganizationInfo.vue'

export default defineComponent({
  name: 'AccountProfile',
  components: {
    AccountTabsNotification,
    AccountProfileInfo,
    Button,
    OrganizationInfo
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    isIndividualUser(): boolean {
      return this.getUserInfo.type === 1
    }
  },
  methods: {
    switchToModal(modalName: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalName)
    },
  }
})
</script>

<style scoped lang='scss'>
@import 'AccountProfile';
@import '../AccountTabs';
@import '../../UserAccount';
</style>
