<template>
  <ModalBase modalImage="SunnySnowyMountain">
    <PasswordChangeForm @onChangePasswordSuccess="handleChangePasswordSuccess"/>
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import PasswordChangeForm
  from '@common/Modals/ModalsModules/PasswordChangeModal/PasswordChangeForm.vue'

export default defineComponent({
  name: 'PasswordChangeModal',
  components: {
    PasswordChangeForm,
    ModalBase
  },
  methods: {
    handleChangePasswordSuccess(): void {
      this.$store.commit('mutAlertText', 'Пароль успешно изменён')
      this.$store.commit('mutOpenedModalName', null)
    }
  }
})
</script>
