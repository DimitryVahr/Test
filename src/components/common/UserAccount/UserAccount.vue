<template>
  <div>
    <div class="headBannerImg" :class="headBannerClasses"></div>
    <Container class="userAccount__container">
      <AccountInfo />
      <AccountTabs />
    </Container>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import AccountInfo from '@common/UserAccount/AccountInfo/AccountInfo.vue'
import AccountTabs from '@common/UserAccount/AccountTabs/AccountTabs.vue'
import { mapGetters } from 'vuex'
import { EAccountFlightScreens, IFlightRecord } from '@/models/userAccount/flights'

export default defineComponent({
  name: 'UserAccount',
  components: {
    AccountTabs,
    AccountInfo,
    Container,
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getAuthKey',
      'getAuthConfig',
      'getIsImagesHidden'
    ]),

    headBannerClasses(): Record<string, boolean> {
      return {
        headBannerImg_company: this.getUserInfo.type === 2,
        headBannerImg_hidden: this.getIsImagesHidden
      }
    },
  },

  watch: {
    getAuthKey: {
      handler(newKey) {
        if (newKey) {
          // Вызов апи рейсов
          this.$services.getFlightRecords(this.getAuthConfig)
            .then((res) => {
              if (res.status === this.ERequestStatus.Success) {

                if ((res.flightRecords as IFlightRecord[]).length > 0) {
                  this.$store.commit('mutFlightRecords', res.flightRecords)
                  this.$store.commit('mutCurrentFlightScreen', EAccountFlightScreens.AccountFlightRecordsInfo)
                } else {
                  this.$store.commit('mutCurrentFlightScreen', EAccountFlightScreens.AccountFlightRecordsOffer)
                }

              } else {
                this.$store.commit('mutAlertText', 'Ошибка при получении списка рейсов.')
              }
            })
          // Вызов апи бонусов
          this.$services.getBonusesTransactions(this.getAuthConfig)
            .then((res) => {
              if (res.status === this.ERequestStatus.Success) {
                this.$store.commit('mutBonusesTransactions', res.bonuses)
              } else {
                this.$store.commit('mutAlertText', 'Ошибка при получении информации о бонусах.')
              }
            })
          // Вызов апи данных о пассажирах
          this.$services.getPassengersInfo(this.getAuthConfig)
            .then((res) => {
              if (res.status === this.ERequestStatus.Success) {
                this.$store.commit('mutPassengers', res.passengers)
              } else {
                this.$store.commit('mutAlertText', 'Ошибка при получении информации о пассажирах.')
              }
            })
        } else {
          this.$store.commit('mutAlertText', 'Авторизуйтесь для получения данных личного кабинета.')
        }
      },
      immediate: true
    }
  },

  unmounted() {
    // Выходим со вкладки пассажира
    this.$store.commit('mutPassenger', null)
  }
})
</script>

<style scoped lang='scss'>
@import 'UserAccount';
</style>
