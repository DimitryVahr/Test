<template>
  <div class="mobileMenu" :class="{ mobileMenu_opened: this.isOpened }">
    <div class="mobileMenu__header">
      <div class="header__logo mobileMenu__logo">
        <router-link :to="{ name: 'Main' }" />
        <Icon
          class="header__icon"
          :width="95"
          :height="60"
          :name="EIconNames.AppLogo"
        />
      </div>
      <Button
        class="mobileMenu__close"
        @click="closeMobileMenu"
        kind="Unstyled"
      >
        <Icon :width="24" :height="24" :name="EIconNames.Cross" />
      </Button>
    </div>
    <div class="mobileMenu__content">
      <MobileMenuItem
        v-for="(item, i) in menuItems"
        :key="item.title + i"
        :item="item"
      />
      <div class="mobileMenu__switches">
        <div class="mobileMenu__switch" ref="mobileSwitch" @click="initBadEyesight">
          <span>Версия для слабовидящих</span>
        </div>
        <div class="mobileMenu__switch">
          <!-- <span>English</span> -->
        </div>
      </div>
      <div class="mobileMenu__socials">
        <!-- <div class="mobileMenu__social">
          <a href="#"
            ><Icon :width="40" :height="40" :name="EIconNames.SocialFb"
          /></a>
        </div>
        <div class="mobileMenu__social">
          <a href="#"
            ><Icon :width="40" :height="40" :name="EIconNames.SocialInst"
          /></a>
        </div> -->
        <div class="mobileMenu__social">
          <a href="https://vk.com/vityaz.aero"
            ><Icon :width="40" :height="40" :name="EIconNames.SocialVk"
          /></a>
        </div>
        <div class="mobileMenu__social">
          <a href="https://t.me/vityaz_aero"
            ><Icon :width="40" :height="40" :name="EIconNames.SocialTelegram"
          /></a>
        </div>
      </div>
    </div>
    <div class="mobileMenu__footer">
      <div class="mobileMenu__text_secondary">
        <span>© 2021 АК «ВИТЯЗЬ-АЭРОо»</span>
      </div>
      <div class="mobileMenu__text_secondary">
        <span><a href="./documents/vityaz-aero_policy.pdf" target="_blank">Политика конфиденциальности</a></span>
      </div>
      <div class="mobileMenu__text_secondary">
        <span>
          Сделано в <a href="https://nutnet.ru" target="_blank">Nutnet</a>, 2022
        </span>
      </div>
      <div class="mobileMenu__payments">
        <div class="mobileMenu__payment">
          <Icon :width="48" :height="32" :name="EIconNames.CardVisa" />
        </div>
        <div class="mobileMenu__payment">
          <Icon :width="48" :height="32" :name="EIconNames.CardMaster" />
        </div>
        <div class="mobileMenu__payment">
          <Icon :width="48" :height="32" :name="EIconNames.CardMir" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { THeaderNavItem } from '../types'
import MobileMenuItem from './MobileMenuItem/MobileMenuItem.vue'

export default defineComponent({
  components: { Icon, MobileMenuItem, Button },
  name: 'MobileMenu',
  props: {
    /**
     * Пункты меню
     */
    menuItems: {
      required: true,
      type: Array as PropType<THeaderNavItem[]>
    },
    /**
     * Меню открыто или закрыто
     */
    isOpened: {
      required: false,
      type: Boolean
    }
  },

  methods: {
    closeMobileMenu() {
      this.$emit('onMobileMenuClose')
    },

    initBadEyesight(): void {
      setTimeout(() => {
        this.$utils.setupEyesightPlugin()
      }, 10)
    }
  },

  watch: {
    $route() {
      this.closeMobileMenu()
    },

    isOpened(newValue) {
      if (newValue) {
        document.body.classList.add('global_no-scroll')
      } else {
        document.body.classList.remove('global_no-scroll')
      }
    }
  },

  mounted() {
    if (this.$utils.getScreenWidth() < 1024) {
      const headerSwitch = this.$refs.mobileSwitch as HTMLElement
      headerSwitch.id = 'specialButton'
    }
  }
})
</script>

<style scoped lang="scss">
@import '../Header';
@import 'MobileMenu';
</style>
