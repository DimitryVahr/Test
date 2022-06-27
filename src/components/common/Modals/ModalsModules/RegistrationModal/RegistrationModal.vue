<template>
  <ModalBase modalImage="registration">
    <RegistrationForm v-if="currentStep === 'RegistrationForm'" @onRegistrationSuccess="onRegistrationSuccess" />
    <RegistrationSuccess v-if="currentStep === 'RegistrationSuccess'" />
    <Button
      kind="Unstyled"
      @click="$store.commit('mutOpenedModalName', 'LogInModal')"
      class="forms__subbtn_mobile"
    >
      Вход
    </Button>
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import RegistrationForm from '@common/Modals/ModalsModules/RegistrationModal/RegistrationForm.vue'
import RegistrationSuccess from '@common/Modals/ModalsModules/RegistrationModal/RegistrationSuccess.vue'
import Button from '@/components/ui/Button/Button.vue'

type TCurrentStep = 'RegistrationForm' | 'RegistrationSuccess'

interface IData {
  currentStep: TCurrentStep
}

export default defineComponent({
  components: {
    ModalBase,
    RegistrationForm,
    RegistrationSuccess,
    Button,
  },
  name: 'RegistrationModal',
  data(): IData {
    return {
      currentStep: 'RegistrationForm'
    }
  },

  methods: {
    onRegistrationSuccess(): void {
      this.currentStep = 'RegistrationSuccess'
    }
  }
})
</script>
<style lang="scss" scoped>
  @import "~@/styles/common.scss";

  .forms__subbtn_mobile {
    padding: 20px;
    font-family: $primary-font-family;
    font-weight: 700;
    color: cl('accent');
    display: none;
    position: absolute;
    top: 0;
    left: 0;

    @include break-lg {
      display: inline-block;
    }
  }
</style>
