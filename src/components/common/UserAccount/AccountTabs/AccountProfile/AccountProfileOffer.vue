<template>
  <div class="accountTabs__tab">
    <div class="accountTabs__offerCard accountTabs__section">
      <div class="accountTabs__section">
        <h3 class="accountTabs__sectionTitle_desktop">Заполните профиль, чтобы оплачивать полёты
          бонусами</h3>
        <p class="userAccount_textCommonBigger accountTabs__row_desktop">
          Вы&nbsp;получите персональный бонусный счет. С&nbsp;ним вы&nbsp;сможете накапливать бонусы
          и&nbsp;тратить их&nbsp;на&nbsp;новые полеты. Бонусы начисляются в&nbsp;размере&nbsp;10% от&nbsp;стоимости
          билета.
        </p>
        <Button
          kind="Link"
          className="userAccount_textLinkThin"
        >
          Подробнее о&nbsp;программе лояльности
        </Button>
      </div>
      <Button
        kind="Primary"
        :is-fluid-mobile="true"
        @click="switchToModal(EModalsNames.ProfileUpdateModal)"
      >
        Заполнить профиль
      </Button>
    </div>
    <Button
      kind="Secondary"
      :noBorder="true"
      :withIcon="true"
      className="accountTabs__bottomActionBtnLink userAccount_textLinkThinSmall"
      @click="switchToModal(EModalsNames.PasswordChangeModal)"
    >
      <Icon
        :name="EIconNames.Edit"
        width="24"
        height="24"
        class="accountTabs__btnIcon distant"
      />
      <span>Изменить пароль</span>
    </Button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { EModalsNames } from '@/models/modals'

export default defineComponent({
  name: 'AccountProfileOffer',
  components: {
    Button,
    Icon
  },
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
@import 'AccountProfile';
</style>
