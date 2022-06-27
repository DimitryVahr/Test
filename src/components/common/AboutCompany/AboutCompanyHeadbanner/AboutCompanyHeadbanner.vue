<template>
  <div class="aboutCompanyHeadbanner">
    <Container>
      <div class="aboutCompanyHeadbanner__content">
        <h1 class="h1">Компания</h1>
      </div>
    </Container>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'

export default defineComponent({
  components: { Container },
  name: 'AboutCompanyHeadbanner',
})
</script>

<style scoped lang='scss'>
@import 'AboutCompanyHeadbanner';
</style>
