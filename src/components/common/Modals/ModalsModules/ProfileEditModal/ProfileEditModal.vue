<template>
  <ModalBase modalImage="profileUpdateSendMessage">
    <ProfileEditForm
      @onProfileEditSuccess="handleProfileUpdate"
    />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ProfileEditForm
  from '@common/Modals/ModalsModules/ProfileEditModal/ProfileEditForm.vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'

export default defineComponent({
  name: 'ProfileEditModal',
  components: {
    ModalBase,
    ProfileEditForm,
  },
  methods: {
    handleProfileUpdate(): void {
      //       const userInfoCopy: IUserFullInfo = { ...this.getUserInfo }
      // userInfoCopy.phone = newPhone

      // this.$store.commit('mutUserInfo', userInfoCopy)
      this.$store.commit('mutAlertText', 'Профиль успешно изменён')
      this.$store.commit('mutOpenedModalName', null)
    }
  }
})
</script>
