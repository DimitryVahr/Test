<template>
  <Icon
    :name="EIconNames.Mail"
    width="48"
    height="48"
    class="forms__succes-icon"
  />
  <h2 class="forms__title notify">Подтвердите регистрацию на&nbsp;сайте</h2>
  <p class="forms__common-text">
    Чтобы завершить регистрацию, перейдите по&nbsp;ссылке, которая пришла на&nbsp;электронную почту
  </p>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  name: 'RegistrationSuccess',
  components: { Icon },
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
