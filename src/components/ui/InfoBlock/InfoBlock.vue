<template>
  <div class="infoBlock">
    <div class="infoBlock__title">
      <span class="infoBlock__title_text">{{title}}</span>
      <span v-if="description" class="infoBlock__title_description">{{description}}</span>
      <slot name="slot0"/>
    </div>
    <div class="infoBlock__content" :class="{infoBlock__content_single: !$slots.slot2}">
        <div class="infoBlock__content_column">
          <slot name="slot1"/>
        </div>
        <div class="infoBlock__content_column" v-if="!!$slots.slot2">
          <slot name="slot2"/>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoBlock',
  props: {
    /**
     * Заглавие
     */
    title: {
      required: false,
      type: String
    },
    /**
     * Описание
     */
    description: {
      required: false,
      type: String
    }
  },
})
</script>

<style scoped lang='scss'>
@import 'InfoBlock.scss';
</style>
