<template>
  <header class="header" :class="headerClasses">
    <Container>
      <div class="header__content">
        <div class="header__logo">
          <router-link :to="{name: 'Main'}" />
          <Icon class="header__icon" :width="95" :height="60" :name="EIconNames.AppLogo" />
        </div>
        <HeaderNav :items="processedNavFields"/>
        <div class="header__switches">
          <!-- <div class="header__switch header__switch--eng ">
            <span>ENG</span>
          </div> -->
            <a class="header__switch special__btn" ref="desktopSwitch" @click="initBadEyesight">
              <Icon :width="24" :height="24" :name="EIconNames.EyeOpenedFilled"/>
              <span>Аа</span>
            </a>
          <router-link :to="{ name: 'FlightRegistration' }">
            <a  class="header__signFlightBtn" v-if="$route.meta.isHeaderFlightButton">
              Записаться на рейс
            </a>
          </router-link>
        </div>
        <div class="header__burgerWrap">
          <router-link :to="{ name: 'FlightRegistration' }">
            <a  class="header__signFlightBtn header__signFlightBtn-mobile" v-if="$route.meta.isHeaderFlightButton">
              Записаться на рейс
            </a>
          </router-link>
          <Button class="header__burger" kind="Unstyled" @click="openMobileMenu">
            <Icon :width="24" :height="24" :name="EIconNames.BurgerMenu"/>
          </Button>
        </div>
        <MobileMenu :menuItems="processedNavFields" :isOpened="isMobileMenuOpened" @onMobileMenuClose="isMobileMenuOpened = false" />
      </div>
    </Container>
  </header>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Icon from '@ui/Icon/Icon.vue'
import Container from '@shared/Container/Container.vue'
import HeaderNav from './HeaderNav/HeaderNav.vue'
import MobileMenu from './MobileMenu/MobileMenu.vue'
import Button from '@/components/ui/Button/Button.vue'
import { THeaderNavItem } from './types'
import { EAccountRoutesNames } from '@/models/userAccount/router'

interface IData {
  headerNavItems: THeaderNavItem[],
  isMobileMenuOpened: boolean,
}

export default defineComponent({
  components: {
    Container,
    Icon,
    HeaderNav,
    MobileMenu,
    Button,
  },
  name: 'Header',
  props: {
    /**
     * Хэдер на прозрачном фоне
     */
    isTransparent: {
      required: false,
      type: Boolean
    },
    /**
     * Хэдер для ЛК
     */
    isFlightBtn: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  data() :IData {
    return {
      headerNavItems: [
        {
          title: 'Услуги',
          dropdownItems: [
            { title: 'Пассажирские перевозки', routeName: 'Transportation' },
            { title: 'Индивидуальные перевозки и авиаработы', routeName: 'TransportationsWork' },
            { title: 'VIP-перевозки', routeName: 'TransportationsVip' },
            { title: 'Пешеходные и вертолетные туры по Камчатке', href: 'https://vityaz.travel/', icon: 'ArrowUpRight' },
            { title: 'VIP-туры и Хелиски на Камчатке', href: 'https://saint-timon.com/', icon: 'ArrowUpRight' },
          ]
        },
        {
          title: 'Пассажирам',
          dropdownItems: [
            { title: 'Запись на рейс', routeName: 'FlightRegistration' },
            { title: 'Программа лояльности', routeName: '' },
            { title: 'Документы', routeName: 'TransportRules' },
            { title: 'Правила провоза багажа', routeName: 'BaggageRules' },
          ]
        },
        {
          title: 'О компании',
          dropdownItems: [
            { title: 'Компания', routeName: 'About' },
            { title: 'Контакты', routeName: 'ContactsCompany' },
          ]
        },
        {
          title: 'Личный кабинет',
          mobileMenuIcon: 'AccountCircle',
          routeName: 'Account',
          isAccount: true,
          // onClick: this.openLogInModal,
        },
      ],
      isMobileMenuOpened: false,
    }
  },

  methods: {
    openMobileMenu(): void {
      this.isMobileMenuOpened = true
    },

    openLogInModal(): void {
      this.$store.commit('mutOpenedModalName', 'LogInModal')
    },

    openRegistrationModal(): void {
      this.$store.commit('mutOpenedModalName', 'RegistrationModal')
    },

    logOut(): void {
      this.$router.push({ name: 'Main' }).then(() => {
        this.$store.commit('mutUserInfo', {})
        this.$store.commit('mutPassengers', [])
        this.$store.commit('mutAuthKey', '')
        localStorage.removeItem('authKey')
      })
    },

    initBadEyesight(): void {
      setTimeout(() => {
        this.$utils.setupEyesightPlugin()
      }, 10)
    }
  },

  computed: {
    ...mapGetters(['getAuthKey']),
    headerClasses() {
      return {
        header_transparent: this.$route.meta.isTransparentHeader,
      }
    },
    processedNavFields(): THeaderNavItem[] {
      return this.headerNavItems.map((item) => {
        if (item.routeName !== 'Account') return item
        return {
          ...item,
          routeName: this.getAuthKey ? EAccountRoutesNames.Profile : undefined,
          onClick: !this.getAuthKey ? this.openLogInModal : undefined,
          dropdownItems: this.getAuthKey ? [
            { title: 'Кабинет', routeName: EAccountRoutesNames.Profile },
            { title: 'Выход', onClick: this.logOut }
          ] : [
            { title: 'Вход', onClick: this.openLogInModal },
            { title: 'Регистрация', onClick: this.openRegistrationModal },
          ]
        }
      })
    }
  },

  mounted() {
    if (this.$utils.getScreenWidth() >= 1024) {
      const headerSwitch = this.$refs.desktopSwitch as HTMLElement
      headerSwitch.id = 'specialButton'
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'Header';
</style>
