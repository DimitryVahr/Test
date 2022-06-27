<template>
  <ModalBase
    modalImage="Winter"
  >
    <HelicopterOrderForm v-if="formStep === 'HelicopterOrderForm'"
                         @onOrderSuccess="onOrderSuccess"/>
    <HelicopterOrderSuccess v-if="formStep === 'HelicopterOrderSuccess'"/>
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import HelicopterOrderForm
  from '@common/Modals/ModalsModules/HelicopterOrderModal/HelicopterOrderForm.vue'
import HelicopterOrderSuccess
  from '@common/Modals/ModalsModules/HelicopterOrderModal/HelicopterOrderSuccess.vue'

type TCurrentStep = 'HelicopterOrderForm' | 'HelicopterOrderSuccess'

interface IData {
  formStep: TCurrentStep
}

export default defineComponent({
  name: 'HelicopterOrderModal',
  components: {
    HelicopterOrderSuccess,
    HelicopterOrderForm,
    ModalBase,
  },
  data: (): IData => {
    return {
      formStep: 'HelicopterOrderForm'
    }
  },
  methods: {
    onOrderSuccess(): void {
      this.formStep = 'HelicopterOrderSuccess'
    }
  }
})
</script>
