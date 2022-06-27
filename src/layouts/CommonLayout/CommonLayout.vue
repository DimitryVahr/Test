<template>
  <main class="main">
    <slot/>
    <Footer/>
  </main>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Footer from '@shared/Footer/Footer.vue'

export default defineComponent({
  name: 'CommonLayout',
  components: {
    Footer,
  },
})
</script>

<style scoped lang='scss'>
@import 'CommonLayout';
</style>
