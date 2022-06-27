<template>
  <div class="headBanner">
    <div class="headBanner__textWrapper">
      <span class="headBanner__text">{{text}}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeadBanner',
  props: {
    /**
     * Текст Хэдбаннера
     */
    text: {
      required: true,
      type: String
    },
  },
})
</script>

<style scoped lang='scss'>
@import 'HeadBanner.scss';
</style>
