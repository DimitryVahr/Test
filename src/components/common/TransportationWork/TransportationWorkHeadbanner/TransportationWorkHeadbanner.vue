<template>
  <div class="transportationWorkHeadbanner">
    <Container>
      <div class="transportationWorkHeadbanner__wrapper">
        <h1 class="transportationWorkHeadbanner__title h1">Индивидуальные перевозки и&nbsp;авиаработы</h1>
        <div class="transportationWorkHeadbanner__content">
          <p class="transportationWorkHeadbanner__content--desktop">Вертолетные перевозки пассажиров и&nbsp;грузов, тушение пожаров и&nbsp;другие работы с&nbsp;воздуха</p>
          <p class="transportationWorkHeadbanner__content--mobile">Регулярные пассажирские рейсы в&nbsp;отдаленные насленные пункты Камчатки</p>
          <Button @click="openHelicopterOrderModal" class="transportationWorkHeadbanner__button" kind="Primary">Заказать вертолет</Button>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Container from '@shared/Container/Container.vue'

export default defineComponent({
  name: 'TransportationWorkHeadbanner',
  components: { Button, Container },
  methods: {
    openHelicopterOrderModal(): void {
      this.$store.commit('mutOpenedModalName', this.EModalsNames.HelicopterOrderModal)
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'TransportationWorkHeadbanner';
</style>
