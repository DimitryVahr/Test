<template>
  <div class="accountInfo" :class="{'accountInfo--mobile':getPassenger !== null}">
    <span class="accountInfo__title">Личный кабинет</span>
    <Button kind="Unstyled" class="accountInfoMobile" :class="toggleClassAccountInfo"
            @click="toggleClasses">
      <div class="accountInfoMobile__wrap">
        <Icon class="accountInfoMobile__icon" :width="16" :height="16"
              :name="EIconNames.AccountInfo"/>
        <span class="accountInfoMobile__name">{{ getUserInfo.name }}</span>
        <div class="accountInfoMobile__iconOpen"></div>
      </div>
      <div class="accountInfoMobile__infoWrap">
        <span class="userAccount_textSecondary">Контактный e-mail</span>
        <span class="userAccount_textCommon">{{ getUserInfo.email }}
        <Button
          kind="Secondary"
          class="button_noBorder accountInfo__btnChangeNumber"
          @click="openModal(EModalsNames.EmailChangeModal)"
        >
          Изменить
        </Button>
        </span>
      </div>
      <div class="accountInfoMobile__infoWrap">
        <span class="userAccount_textSecondary">Контактный телефон</span>
        <span class="userAccount_textCommon">{{ getUserInfo.phone }}
        <Button
          kind="Secondary"
          class="button_noBorder accountInfo__btnChangeNumber"
          @click="openModal(EModalsNames.PhoneChangeModal)"
        >
          Изменить
        </Button>
        </span>
      </div>
    </Button>
    <div class="accountInfo__bonusesWrap">
      <div class="accountInfo__bonusesItem">
        <span class="userAccount_textSecondary">№ <span
          class="accountInfo__bonusWord">бонусного</span> счёта</span>
        <span class="userAccount_textBold accountInfo__number">{{
            !getUserInfo.bonus ? '—' : getUserInfo.bonus
          }}</span>
      </div>
      <div class="accountInfo__bonusesItem">
        <span class="userAccount_textSecondary">Бонусы</span>
        <span
          class="userAccount_textBold accountInfo__number">{{
            !this.getBonusesInfo?.balance?.active ? '0' : this.getBonusesInfo?.balance?.active
          }}</span>
      </div>
    </div>
    <div class="userAccount_textBoldSmall accountInfo__name">{{ getUserInfo.name }}
      {{ getUserInfo.surname }}
    </div>
    <div class="accountInfo__infoWrap">
      <span class="userAccount_textSecondary">Контактный e-mail</span>
      <span class="userAccount_textCommon">{{ getUserInfo.email }}
        <Button
          kind="Secondary"
          class="button_noBorder accountInfo__btnChangeEmail"
          @click="$store.commit('mutOpenedModalName', EModalsNames.EmailChangeModal)"
        >
          Изменить
        </Button>
      </span>
    </div>
    <div class="accountInfo__infoWrap">
      <span class="userAccount_textSecondary">Контактный телефон</span>
      <span class="userAccount_textCommon">{{ $utils.formatPhone(getUserInfo.phone) }}
        <Button
          kind="Secondary"
          class="button_noBorder accountInfo__btnChangeNumber"
          @click="$store.commit('mutOpenedModalName', EModalsNames.PhoneChangeModal)"
        >
          Изменить
        </Button>
      </span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { EModalsNames } from '@/models/modals'

interface IData {
  isOpened: boolean
}

export default defineComponent({
  name: 'AccountInfo',
  components: { Button, Icon },

  data(): IData {
    return {
      isOpened: false,
    }
  },

  methods: {
    toggleClasses(): void {
      this.isOpened = !this.isOpened
    },
    openModal(modalName: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalName)
    }
  },

  computed: {
    ...mapGetters(['getUserInfo', 'getPassenger', 'getBonusesInfo']),
    toggleClassAccountInfo(): Record<string, boolean> {
      return {
        'accountInfoMobile--opened': this.isOpened
      }
    },
  },
})
</script>

<style scoped lang='scss'>
@import '../UserAccount';
@import 'AccountInfo';

</style>
