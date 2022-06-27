<template>
  <ModalBase modalImage="SunnySnowyMountain">
    <PhoneChangeForm
      @onPhoneChangeSuccess="handlePhoneChangeSuccess"
    />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import PhoneChangeForm from '@common/Modals/ModalsModules/PhoneChangeModal/PhoneChangeForm.vue'
import { mapGetters } from 'vuex'
import { IUserFullInfo } from '@/models/forms/userForms'

export default defineComponent({
  name: 'PhoneChangeModal',
  components: { PhoneChangeForm, ModalBase },
  computed: {
    ...mapGetters([
      'getUserInfo',
    ])
  },
  methods: {
    handlePhoneChangeSuccess(newPhone: string): void {
      const userInfoCopy: IUserFullInfo = { ...this.getUserInfo }
      userInfoCopy.phone = newPhone

      this.$store.commit('mutUserInfo', userInfoCopy)
      this.$store.commit('mutAlertText', 'Телефон успешно изменён')
      this.$store.commit('mutOpenedModalName', null)
    }
  }
})
</script>
