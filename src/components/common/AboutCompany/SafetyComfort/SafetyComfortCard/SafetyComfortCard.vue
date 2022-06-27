<template>
  <div class='safetyComfortCard'>
    <h3 class="h3">{{ cardInfo.title }}</h3>
    <p class="safetyComfortCard__text">{{ cardInfo.text }}</p>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { ISafetyComfortCard } from '../types'

export default defineComponent({
  name: 'SafetyComfortCard',
  props: {
    /**
     * Заголовок и текст карточки
     */
    cardInfo: {
      required: true,
      type: Object as PropType<ISafetyComfortCard>
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'SafetyComfortCard';
</style>
