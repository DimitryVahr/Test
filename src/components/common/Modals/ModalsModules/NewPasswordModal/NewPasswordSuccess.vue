<template>
  <Icon
    :name="EIconNames.Success"
    width="48"
    height="48"
    class="forms__succes-icon"
  />
  <h2 class="forms__title notify">Новый пароль  успешно установлен</h2>
  <Button
    kind="Primary"
    className="forms__submit-btn"
    :isFluid="true"
    @click="switchToLogIn"
  >
    Войти
  </Button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'
import Button from '@/components/ui/Button/Button.vue'

export default defineComponent({
  name: 'NewPasswordSuccess',
  components: { Icon, Button },
  methods: {
    switchToLogIn(): void {
      this.$store.commit('mutOpenedModalName', this.EModalsNames.LogInModal)
    }
  }
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
