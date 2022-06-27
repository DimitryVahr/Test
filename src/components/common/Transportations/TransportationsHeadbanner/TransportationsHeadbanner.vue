<template>
  <div class="transportationsHeadbanner">
    <Container>
      <div class="transportationsHeadbanner__wrapper">
        <h1 class="transportationsHeadbanner__title h1">Пассажирские рейсы</h1>
        <div class="transportationsHeadbanner__content">
          <p class="transportationsHeadbanner__content--desktop">Перелёты между населенными пунктами Камчатского края</p>
          <p class="transportationsHeadbanner__content--mobile">Регулярные пассажирские рейсы в&nbsp;отдаленные насленные пункты Камчатки</p>
          <router-link class="transportationsHeadbanner__button" :to="{name:'FlightRegistration'}">Записаться на рейс</router-link >
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'

export default defineComponent({
  components: { Container },
  name: 'TransportationsHeadbanner',
})
</script>

<style scoped lang='scss'>
@import 'TransportationsHeadbanner';
</style>
