<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Container',
})
</script>

<style scoped lang='scss'>
@import "Container.scss";
</style>
