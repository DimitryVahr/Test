<template>
  <ModalBase modalImage="login">
    <OrganizationUpdateForm />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import OrganizationUpdateForm from './OrganizationUpdateForm.vue'

export default defineComponent({
  name: 'OrganizationUpdateModal',
  components: {
    ModalBase,
    OrganizationUpdateForm,
  },
})
</script>
