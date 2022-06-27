<template>
  <ModalBase modalImage="MountainLake">
    <div class="questionWrap">
      <span class="question">Вы уверены, что хотите удалить пассажира?</span>
      <div class="btnWrap">
        <Button kind="Primary" class="deleteBtn" :isDisabled="getIsLoading" @click="closeModal">Нет</Button>
        <Button kind="Secondary" class="deleteBtn" :isDisabled="getIsLoading" @click="deletePassenger">Да</Button>
      </div>
    </div>
  </ModalBase>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ModalBase from '@shared/ModalBase/ModalBase.vue'
import Button from '@ui/Button/Button.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  components: {
    ModalBase,
    Button,
  },
  name: 'DeletePassengerModal',

  computed: {
    ...mapGetters(['getPassenger', 'getAuthConfig', 'getIsLoading'])
  },

  methods: {
    closeModal(): void {
      this.$store.commit('mutOpenedModalName', null)
    },
    deletePassenger(): void {
      this.$store.commit('mutIsLoading', true)
      this.$services.DeletePassenger(this.getPassenger.id, this.getAuthConfig).then((res) => {
        this.$store.commit('mutIsLoading', false)
        if (res.status === this.ERequestStatus.Success) {
          this.$store.commit('mutPassenger', null)
          this.$store.commit('mutAlertText', 'Пассажир успешно удален')
          this.$services.getPassengersInfo(this.getAuthConfig)
            .then((response) => {
              if (response.status === this.ERequestStatus.Success) {
                this.$store.commit('mutPassengers', response.passengers)
              } else {
                this.$store.commit('mutAlertText', 'Ошибка при получении информации о пассажирах.')
              }
            })
        } else {
          this.$store.commit('mutAlertText', 'Ошибка при удалении пассажира')
        }
        this.closeModal()
      })
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'DeletePassengerModal';
</style>
