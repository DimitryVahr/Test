<template>
  <ModalBase modalImage="SunnySnowyMountain">
    <component
      :is="currentStep"
      @onEmailChangeSuccess="handleEmailChangeSuccess"
    />
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import EmailChangeForm from '@common/Modals/ModalsModules/EmailChangeModal/EmailChangeForm.vue'
import EmailChangeSuccess from '@common/Modals/ModalsModules/EmailChangeModal/EmailChangeSuccess.vue'
import { mapGetters } from 'vuex'

type TCurrentStep = 'EmailChangeForm' | 'EmailChangeSuccess'

interface IData {
  currentStep: TCurrentStep
}

export default defineComponent({
  name: 'EmailChangeModal',
  components: {
    EmailChangeForm,
    EmailChangeSuccess,
    ModalBase
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
    ])
  },
  data(): IData {
    return {
      currentStep: 'EmailChangeForm'
    }
  },

  methods: {
    handleEmailChangeSuccess(): void{
      this.currentStep = 'EmailChangeSuccess'
    }
  }
})
</script>
