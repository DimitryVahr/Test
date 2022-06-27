<template>
  <div class="accountTabs">
    <div class="accountTabs__tabsBtnsWrapper" :class="{'accountTabs__tabsBtnsWrapper--mobile':getPassenger !== null}">
      <Swiper
        slidesPerView="auto"
        :spaceBetween="0"
      >
        <SwiperSlide
          v-for="tab in processedUserTabs"
          :key="tab.routeName"
          class="accountTabs__tabSlide"
        >
          <Button
            kind="FullUnstyled"
            :className="getTabBtnClasses(tab.routeName)"
            @click="handleRouteChange(tab.route)"
          >
            {{ tab.tabTitle }}
          </Button>
        </SwiperSlide>
      </Swiper>
    </div>

    <transition name="fadeFaster" mode="out-in">
      <component :is="$router.currentRoute.value.name"/>
    </transition>

  </div>
</template>

<script lang='ts'>
import { mapGetters } from 'vuex'
import { defineComponent } from 'vue'
import AccountBonuses from '@common/UserAccount/AccountTabs/AccountBonuses/AccountBonuses.vue'
import AccountFlightRecords
  from '@common/UserAccount/AccountTabs/AccountFlightRecords/AccountFlightRecords.vue'
import AccountPassengers
  from '@common/UserAccount/AccountTabs/AccountPassengers/AccountPassengers.vue'
import AccountProfile from '@common/UserAccount/AccountTabs/AccountProfile/AccountProfile.vue'
import Button from '@ui/Button/Button.vue'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { EAccountRoutes, EAccountRoutesNames } from '@/models/userAccount/router'

interface ITab {
  route: EAccountRoutes,
  routeName: EAccountRoutesNames,
  tabTitle: string
}

interface IData {
  userAccountTabs: ITab[],
  organizationAccountTabs: ITab[],
}

export default defineComponent({
  name: 'AccountTabs',
  components: {
    AccountBonuses,
    AccountFlightRecords,
    AccountPassengers,
    AccountProfile,
    Button,
    Swiper,
    SwiperSlide,
  },
  data: (): IData => {
    return {
      userAccountTabs: [
        {
          route: EAccountRoutes.Profile,
          routeName: EAccountRoutesNames.Profile,
          tabTitle: 'Профиль'
        },
        {
          route: EAccountRoutes.Bonuses,
          routeName: EAccountRoutesNames.Bonuses,
          tabTitle: 'Бонусы'
        },
        {
          route: EAccountRoutes.Passengers,
          routeName: EAccountRoutesNames.Passengers,
          tabTitle: 'Пассажиры'
        },
        {
          route: EAccountRoutes.FlightRecords,
          routeName: EAccountRoutesNames.FlightRecords,
          tabTitle: 'Записи на рейс'
        },
      ],
      organizationAccountTabs: [
        {
          route: EAccountRoutes.Profile,
          routeName: EAccountRoutesNames.Profile,
          tabTitle: 'Организация'
        },
        {
          route: EAccountRoutes.Passengers,
          routeName: EAccountRoutesNames.Passengers,
          tabTitle: 'Пассажиры'
        },
        {
          route: EAccountRoutes.FlightRecords,
          routeName: EAccountRoutesNames.FlightRecords,
          tabTitle: 'Записи на рейс'
        },
      ]
    }
  },
  methods: {
    getTabBtnClasses(routeName: EAccountRoutesNames): string {
      let btnClasses = 'accountTabs__tabBtn'

      if (routeName === this.$router.currentRoute.value.name) {
        btnClasses += ' accountTabs__tabBtn_active'
      }
      return btnClasses
    },
    handleRouteChange(route: EAccountRoutes): void {
      this.$router.push(route)
    }
  },
  computed: {
    ...mapGetters(['getPassenger', 'getUserInfo']),
    processedUserTabs(): ITab[] {
      return this.getUserInfo.type === 1 ? this.userAccountTabs : this.organizationAccountTabs
    }
  }
})

</script>

<style scoped lang='scss'>
@import 'AccountTabs';
</style>
