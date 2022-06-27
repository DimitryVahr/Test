<template>
  <div class='reputationDescriptionCard'>
    <h3 class="h3_large">{{ card.title }}</h3>
    <p class="reputationDescriptionCard__description">{{ card.description }}</p>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { IReputationDescriptionCard } from '../types'

export default defineComponent({
  name: 'ReputatuionDescriptionCard',
  props: {
    /**
     * Название и описание
     */
    card: {
      required: true,
      type: Object as PropType<IReputationDescriptionCard>,
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'ReputatuionDescriptionCard';
</style>
