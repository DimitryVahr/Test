<template>
  <div class="vipDescription">
    <Container class="vipDescription__container">
      <h2 class="h2_large vipDescription__title">Комфорт и&nbsp;сервис в&nbsp;индивидуальных и&nbsp;корпоративных полетах</h2>
      <h2 class="h2_large vipDescription__title--mobile">Комфорт и&nbsp;сервис&nbsp;в индивидуальных и&nbsp;корпоративных полетах</h2>
      <div class="vipDescriptionItem vipDescriptionItem--first ">
        <div class="vipDescriptionItem__imgLarge">
          <img src="@/assets/img/vip/helli1.jpg" alt="hellicopter">
        </div>
        <div class="vipDescriptionItem__description">
          <h2 class="vipDescriptionItem__title">Флагманский вертолет бизнес-класса Ми-8МТВ VIP</h2>
          <p class="vipDescriptionItem__text">В&nbsp;деловую или туристическую поездку могут отправиться до&nbsp;9&nbsp;пассажиров. Для больших групп&nbsp;&mdash; вертолеты Ми-8П пассажирской комплектации.</p>
          <div class="vipDescriptionItem__images">
            <img src="@/assets/img/vip/helli-side.png" alt="hellicopter">
            <img src="@/assets/img/vip/helli-cab.jpg" alt="hellicpter">
          </div>
        </div>
      </div>
    </Container>
    <div class="vipDescription__img">
      <img src="@/assets/img/vip/helli2.jpg" alt="hellicopter">
    </div>
    <Container class="vipDescription__container">
      <div class="vipDescriptionItem vipDescriptionItem--salon">
        <div class="vipDescriptionItem__description vipDescriptionItem__description--salon">
          <h2 class="vipDescriptionItem__title vipDescriptionItem__title--salon">Зал повышенной комфортности</h2>
          <p class="vipDescriptionItem__text">В&nbsp;бизнес-зале можно скоротать время до&nbsp;вылета, угощаясь холодными закусками, или провести деловые переговоры.</p>
          <div class="vipDescriptionItem__facts">
            <span class="vipDescriptionItem__fact">18</span>
            <span class="vipDescriptionItem__factsText">человек <br>вмещает зал</span>
          </div>
        </div>
        <div class="vipDescriptionItem__imgLarge vipDescriptionItem__imgLarge--salon">
          <img src="@/assets/img/vip/helli-salon.jpg" alt="hellicopter">
        </div>
      </div>
    </Container>
    <Container class="vipDescription__container">
      <div class="vipDescriptionItem vipDescriptionItem--flights">
        <div class="vipDescriptionItem__imgLarge vipDescriptionItem__imgLarge--flights">
          <img src="@/assets/img/vip/helli3.jpg" alt="hellicopter">
        </div>
        <div class="vipDescriptionItem__description">
          <h2 class="vipDescriptionItem__title vipDescriptionItem__title--flights">Перелеты в&nbsp;любую точку Камчатки</h2>
          <p class="vipDescriptionItem__text">Прямоугольные иллюминаторы позволят вам не&nbsp;упустить из виду ничего, чем богата флора и&nbsp;фауна Камчатского края.</p>
          <div class="vipDescriptionItem__facts">
            <span class="vipDescriptionItem__fact">До 4 ч.</span>
            <span class="vipDescriptionItem__factsText"> полетного времени <br>без дозаправки</span>
          </div>
          <Button class="vipDescriptionItem__button" kind="Primary" @click="openHelicopterOrderModal" >Заказать вертолет</Button>
        </div>
      </div>
    </Container>
    <Button
      class="vipDescriptionItem__button--mobile"
      kind="Primary"
      @click="openHelicopterOrderModal">
      Заказать вертолет
    </Button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import Button from '@ui/Button/Button.vue'

export default defineComponent({
  name: 'TransportationVipDescription',
  components: {
    Button,
    Container
  },

  methods: {
    openHelicopterOrderModal(): void {
      this.$store.commit('mutOpenedModalName', this.EModalsNames.HelicopterOrderModal)
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'TransportationVipDescription';
</style>
