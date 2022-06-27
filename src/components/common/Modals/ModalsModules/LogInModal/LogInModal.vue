<template>
  <ModalBase modalImage="login">
    <LogInForm />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import LogInForm from '@common/Modals/ModalsModules/LogInModal/LogInForm.vue'

export default defineComponent({
  components: { ModalBase, LogInForm },
  name: 'LogInModal',
})
</script>
