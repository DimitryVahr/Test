<template>
  <ModalBase modalImage="profileUpdateSendMessage">
    <component
      :is="formStep"
      @onProfileUpdateSuccess="handleProfileUpdate"
    />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ProfileUpdateForm
  from '@common/Modals/ModalsModules/ProfileUpdateModal/ProfileUpdateForm.vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import ProfileUpdateSuccess
  from '@common/Modals/ModalsModules/ProfileUpdateModal/ProfileUpdateSuccess.vue'

interface IData {
  formStep: 'ProfileUpdateForm' | 'ProfileUpdateSuccess'
}

export default defineComponent({
  name: 'ProfileUpdateModal',
  components: {
    ModalBase,
    ProfileUpdateForm,
    ProfileUpdateSuccess
  },
  data: (): IData => {
    return {
      formStep: 'ProfileUpdateForm'
    }
  },
  methods: {
    handleProfileUpdate(): void {
      this.formStep = 'ProfileUpdateSuccess'
    }
  }
})
</script>
