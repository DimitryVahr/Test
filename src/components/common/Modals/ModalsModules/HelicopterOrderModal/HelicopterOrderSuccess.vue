<template>
  <Icon
    :name="EIconNames.Success"
    width="48"
    height="48"
    class="forms__succes-icon"
  />
  <h2 class="forms__title notify">Спасибо за ваш заказ</h2>
  <p class="forms__common-text">
    Менеджер свяжется с вами в ближайшее время по указанному телефону.
  </p>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  name: 'HelicopterOrderSuccess',
  components: { Icon }
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
