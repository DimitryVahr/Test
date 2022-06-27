<template>
  <transition :name="transitionName">
      <component :is="getOpenedModalName"/>
  </transition>
  <transition name="fade">
      <component :is="getOpenedAdditionalModalName" />
  </transition>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import DocumentsPreviewModal
  from '@common/Modals/ModalsModules/DocumentsPreviewModal/DocumentsPreviewModal.vue'
import HelicopterOrderModal
  from '@common/Modals/ModalsModules/HelicopterOrderModal/HelicopterOrderModal.vue'
import PassengerTransportationModal
  from '@common/Modals/ModalsModules/PassengerTransportationModal/PassengerTransportationModal.vue'
import SendMessageModal from '@common/Modals/ModalsModules/SendMessageModal/SendMessageModal.vue'
import LogInModal from '@common/Modals/ModalsModules/LogInModal/LogInModal.vue'
import PasswordRecoveryModal
  from '@common/Modals/ModalsModules/PasswordRecoveryModal/PasswordRecoveryModal.vue'
import NewPasswordModal from '@common/Modals/ModalsModules/NewPasswordModal/NewPasswordModal.vue'
import RegistrationModal from '@common/Modals/ModalsModules/RegistrationModal/RegistrationModal.vue'
import PasswordChangeModal
  from '@common/Modals/ModalsModules/PasswordChangeModal/PasswordChangeModal.vue'
import ProfileUpdateModal
  from '@common/Modals/ModalsModules/ProfileUpdateModal/ProfileUpdateModal.vue'
import ProfileEditModal
  from '@common/Modals/ModalsModules/ProfileEditModal/ProfileEditModal.vue'
import PhoneChangeModal from '@common/Modals/ModalsModules/PhoneChangeModal/PhoneChangeModal.vue'
import EmailChangeModal from '@common/Modals/ModalsModules/EmailChangeModal/EmailChangeModal.vue'
import AddPassengerModal from '@common/Modals/ModalsModules/AddPassengerModal/AddPassengerModal.vue'
import ChangePassengerModal from '@common/Modals/ModalsModules/ChangePassengerModal/ChangePassengerModal.vue'
import OrganizationUpdateModal from '@common/Modals/ModalsModules/OrganizationUpdateModal/OrganizationUpdateModal.vue'
import DeletePassengerModal from '@common/Modals/ModalsModules/DeletePassengerModal/DeletePassengerModal.vue'
import ScansSliderModal from '@common/Modals/ModalsModules/ScansSliderModal/ScansSliderModal.vue'

interface IData {
  modalsWithFadeTransition: string[]
  modalNameTemp: string | null
}

export default defineComponent({
  name: 'Modals',
  components: {
    DocumentsPreviewModal,
    HelicopterOrderModal,
    PassengerTransportationModal,
    SendMessageModal,
    LogInModal,
    PasswordRecoveryModal,
    NewPasswordModal,
    RegistrationModal,
    PasswordChangeModal,
    ProfileUpdateModal,
    ProfileEditModal,
    PhoneChangeModal,
    EmailChangeModal,
    AddPassengerModal,
    ChangePassengerModal,
    OrganizationUpdateModal,
    DeletePassengerModal,
    ScansSliderModal,
  },
  data(): IData {
    return {
      modalsWithFadeTransition: ['DocumentsPreviewModal'],
      modalNameTemp: null
    }
  },

  computed: {
    ...mapGetters([
      'getOpenedModalName',
      'getOpenedAdditionalModalName',
    ]),

    transitionName(): string {
      return this.modalsWithFadeTransition.some((modalName) => modalName === this.modalNameTemp) ? 'fade' : 'moveFromRight'
    }
  },

  watch: {
    getOpenedModalName(value: string): void {
      if (value) {
        this.modalNameTemp = this.getOpenedModalName
      } else {
        setTimeout(() => {
          this.modalNameTemp = null
        }, 0)
      }
    }
  }
})
</script>
