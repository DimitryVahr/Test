<template>
  <Icon
    :name="EIconNames.Success"
    width="48"
    height="48"
    class="forms__succes-icon"
  />
  <h2 class="forms__title notify">Сообщение отправлено</h2>
  <p class="forms__common-text">
    Мы ответим в ближайшее время.
  </p>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  name: 'SendMessageSuccess',
  components: { Icon }
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
