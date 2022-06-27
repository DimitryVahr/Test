<template>
  <section class='reputation'>
    <Container>
      <h2 class="h2_large">За нами закрепилась репутация надежного партнера</h2>
    </Container>
    <Container class="reputation__container">
      <div class="reputation__content">
        <div class="reputation__row reputation__row_images">
          <div class="reputation__img reputation__img_small">
            <img src="@/assets/img/aboutCompany/reputation2.jpg" alt="Вертолетная площадка">
          </div>
          <div class="reputation__img reputation__img_large">
            <img src="@/assets/img/aboutCompany/reputation1.jpg" alt="Вход в здание компании">
          </div>
        </div>
        <div class="reputation__row reputation__row_infrastructure">
          <ReputatuionDescriptionCard :card="descriptionCards[0]" />
          <div class="reputation__img reputation__img_small">
            <img src="@/assets/img/aboutCompany/reputation3.jpg" alt="Кабина пилота">
          </div>
        </div>
        <div class="reputation__row reputation__row_control">
          <div class="reputation__img reputation__img_large">
            <img src="@/assets/img/aboutCompany/reputation4.jpg" alt="Контроль качества вертолета">
          </div>
          <ReputatuionDescriptionCard :card="descriptionCards[1]" />
        </div>
        <div class="reputation__row reputation__row_enlargement">
          <ReputatuionDescriptionCard :card="descriptionCards[2]" />
          <div class="reputation__img reputation__img_small">
            <img src="@/assets/img/aboutCompany/reputation5.jpg" alt="Летящий вертолет">
          </div>
        </div>
      </div>
    </Container>
    <div class="reputation__img reputation__img_full">
      <img src="@/assets/img/aboutCompany/reputation6.jpg" alt="Вертолеты на площадке">
    </div>
  </section>
</template>

<script lang='ts'>
import Container from '@shared/Container/Container.vue'
import { defineComponent } from 'vue'
import ReputatuionDescriptionCard from './ReputatuionDescriptionCard/ReputatuionDescriptionCard.vue'
import { IReputationDescriptionCard } from './types'

interface IData {
  descriptionCards: IReputationDescriptionCard[]
}

export default defineComponent({
  components: { Container, ReputatuionDescriptionCard },
  name: 'Reputation',
  data(): IData {
    return {
      descriptionCards: [
        { title: 'Развитая инфраструктура базирования вертолетов', description: 'Шесть постоянно действующих вертолетных площадок, единственный в регионе комплекс технического обслуживания полного цикла, комфортабельный аэропорт.' },
        { title: 'Строгий контроль технического состояния', description: 'Чтобы обеспечить комфорт и безопасность пассажиров, проводим техническое переоснащение и регулярно обновляем вертолетный парк.' },
        { title: 'Расширение авиапарка', description: 'Это актуально в связи с ростом туристического потока — с каждым годом количество перевезенных туристов увеличивается на несколько тысяч человек. Растет и спрос на авиаработы.' },
      ]
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'Reputation';
</style>
