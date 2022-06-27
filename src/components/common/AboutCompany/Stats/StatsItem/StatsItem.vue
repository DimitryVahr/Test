<template>
  <div class='statsItem'>
    <span class="statsItem__title"><span class="statsItem__amount">{{ itemInfo.title.amount }}</span>{{ itemInfo.title.text }}</span>
    <p class="statsItem__description" v-for="(paragraph, i) in itemInfo.description" :key="paragraph + i">{{ paragraph }}</p>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { IStat } from '../types'

export default defineComponent({
  name: 'StatsItem',
  props: {
    /**
     * Количество чего-то и описание
     */
    itemInfo: {
      required: true,
      type: Object as PropType<IStat>
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'StatsItem';
</style>
