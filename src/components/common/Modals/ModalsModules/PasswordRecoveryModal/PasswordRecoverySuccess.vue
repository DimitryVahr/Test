<template>
  <Icon
    :name="EIconNames.Success"
    width="48"
    height="48"
    class="forms__succes-icon"
  />
  <h2 class="forms__title notify">Проверьте электронную почту</h2>
  <p class="forms__common-text">Мы отправили вам ссылку для&nbsp;восстановления пароля.</p>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  name: 'PasswordRecoverySuccess',
  components: { Icon }
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
