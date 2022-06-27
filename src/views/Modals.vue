<template>
  <CommonLayout>
    <div class="modal-btn-wrapper">

      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.HelicopterOrderModal)"
      >
        Заказ вертолета
      </Button>

      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.SendMessageModal)"
      >
        Отправка сообщения
      </Button>

      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.LogInModal)"
      >
        Вход
      </Button>

      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.PasswordRecoveryModal)"
      >
        Запрос на восстановление пароля
      </Button>

      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.NewPasswordModal)"
      >
        Новый пароль
      </Button>

      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.PasswordChangeModal)"
      >
        Смена пароля
      </Button>

      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.RegistrationModal)"
      >
        Регистрация
      </Button>

      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.ProfileUpdateModal)"
      >
        Заполнить профиль
      </Button>

      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.PhoneChangeModal)"
      >
        Изменить телефон
      </Button>
      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.AddPassengerModal)"
      >
        Добавить пассажира
      </Button>
      <Button
        kind="Primary"
        @click="handleModalOpen(EModalsNames.OrganizationUpdateModal)"
      >
        Редактировать организацию
      </Button>
    </div>
  </CommonLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'
import { EModalsNames } from '@/models/modals'

export default defineComponent({
  name: 'Modals',
  components: {
    CommonLayout,
    Button,
  },
  data() {
    return {}
  },
  methods: {
    handleModalOpen(modalNameToOpen: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalNameToOpen)
    }
  }
})
</script>
<style scoped lang="scss">
.modal-btn-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-bottom: 20px;
  }
}
</style>
