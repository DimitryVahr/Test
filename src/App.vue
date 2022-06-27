<template>
  <Header />
  <router-view />
  <IconSprite />
  <Modals/>
  <Alert/>
</template>

<script lang="ts">
import IconSprite from '@ui/Icon/IconSprite/IconSprite.vue'
import Modals from '@common/Modals/Modals.vue'
import Alert from '@shared/Alert/Alert.vue'
import { mapGetters } from 'vuex'
import { defineComponent } from 'vue'
import Header from '@shared/Header/Header.vue'
import { EModalsNames } from '@/models/modals'
import { ERequestStatus } from '@/models/status'

export default defineComponent({
  name: 'App',
  components: {
    IconSprite,
    Header,
    Modals,
    Alert
  },
  computed: {
    ...mapGetters([
      'getOpenedModalName',
      'getOpenedAdditionalModalName',
      'getAuthConfig'
    ])
  },
  watch: {
    getOpenedModalName(newName: EModalsNames | null): void {
      const body = document.querySelector('body')
      if (body !== null) {
        if (newName !== null) {
          body.classList.add('global_no-scroll')
        } else {
          body.classList.remove('global_no-scroll')
        }
      }
    },
    getOpenedAdditionalModalName(newName: EModalsNames | null): void {
      const body = document.querySelector('body')
      if (body !== null && !this.getOpenedModalName) {
        if (newName !== null) {
          body.classList.add('global_no-scroll')
        } else {
          body.classList.remove('global_no-scroll')
        }
      }
    }
  },
  created(): void {
    this.$services.getStates().then((res) => {
      if (res.status === ERequestStatus.Success) {
        this.$store.commit('mutStates', res.states)
      } else {
        this.$store.commit('mutAlertText', 'Ошибка получения стран')
      }
    })
    this.$services.getDocumentTypes().then((res) => {
      if (res.status === ERequestStatus.Success) {
        this.$store.commit('mutDocumentTypes', res.docTypes)
      } else {
        this.$store.commit('mutAlertText', 'Ошибка получения типов документов')
      }
    })

    this.$services.getSections(this.getAuthConfig).then((res) => {
      if (res.status === ERequestStatus.Success) {
        this.$store.commit('mutSections', res.sections)
      } else {
        this.$store.commit(
          'mutAlertText',
          'Ошибка получения информации о точках полета'
        )
      }
    })
    if (localStorage.getItem('authKey')) {
      this.$services.getUserInfo(this.getAuthConfig).then((res) => {
        if (res.status === ERequestStatus.Success) {
          this.$store.commit('mutUserInfo', res)
        } else {
          this.$store.commit(
            'mutAlertText',
            'Ошибка получения информации о пользователе'
          )
        }
      })

      this.$services.getBonus(this.getAuthConfig).then((res) => {
        if (res.status === ERequestStatus.Success) {
          this.$store.commit('mutBonusesInfo', res)
        } else {
          this.$store.commit(
            'mutAlertText',
            'Ошибка получения информации о бонусах'
          )
        }
      })
    }

    // Если включен плагин для слабовидящих
    setTimeout(() => {
      if (document.querySelector('#special')) {
        this.$utils.setupEyesightPlugin()
      }
    }, 1)
  }
})
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
