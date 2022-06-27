<template>
  <section class='services'>
    <Container>
      <div class="services__title">
        <h2 class="h2_large">Услуги</h2>
        <p class="services__description services__description_desktop">Перевозим пассажиров, экскурсионные группы, различные грузы. Выполняем авиаработы. Работаем с&nbsp;компаниями и&nbsp;частными лицами. Арендуйте вертолет или запишитесь на&nbsp;регулярный рейс.</p>
        <p class="services__description services__description_mobile">Мы предоставляем широкий спектр услуг по&nbsp;перевозке пассажиров, экскурсионных групп, различных грузов.</p>
      </div>
    </Container>
    <Container class="services__container">
      <div class="services__cards services__cards_main">
        <MainServiceCard v-for="(card, i) in mainServices" :key="card.title + i" :content="card" />
      </div>
    </Container>
    <Container>
      <div class="services__subtitle">
        <h2 class="h2">Дополнительные услуги наших партнеров</h2>
      </div>
    </Container>
    <Container class="services__container">
      <div class="services__cards services__cards_additional">
        <AdditionalServiceCard v-for="(card, i) in additionalServices" :key="card.title + i" :content="card" />
      </div>
    </Container>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import { IMainServiceCard, IAdditionalServiceCard } from './types'
import MainServiceCard from './MainServiceCard/MainServiceCard.vue'
import AdditionalServiceCard from './AdditionalServiceCard/AdditionalServiceCard.vue'

interface IData {
  mainServices: IMainServiceCard[],
  additionalServices: IAdditionalServiceCard[],
}

export default defineComponent({
  components: { Container, MainServiceCard, AdditionalServiceCard },
  name: 'Services',
  data(): IData {
    return {
      mainServices: [
        {
          title: 'Пассажирские рейсы',
          description: 'Перелёты между населенными пунктами Камчатского края',
          routeName: 'Transportation',
          posterImgName: 'mainService1'
        },
        {
          title: 'VIP-перевозки',
          description: 'Арендуйте вертолет бизнес-класса для съемки фильма, туристической поездки или деловой встречи',
          routeName: 'TransportationsVip',
          posterImgName: 'mainService2'
        },
        {
          title: 'Индивидуальные перевозки и авиаработы',
          description: 'Закажите вертолет для перевозки пассажиров и грузов, тушения пожаров и других работ с воздуха',
          routeName: 'TransportationsWork',
          posterImgName: 'mainService3'
        },
      ],
      additionalServices: [
        {
          title: 'Пешеходные и вертолетные\nтуры\u00A0по Камчатке',
          posterImgName: 'additionalServicePoster1',
          logoImgName: 'additionalServiceLogo1',
          link: 'https://vityaz.travel'
        },
        {
          title: 'VIP-туры и хелиски\nна Камчатке',
          posterImgName: 'additionalServicePoster2',
          logoImgName: 'additionalServiceLogo2',
          link: 'https://saint-timon.com'
        },
        {
          title: 'VIP-туры для рыбаков\nи охотников',
          posterImgName: 'additionalServicePoster3',
          logoImgName: 'additionalServiceLogo3',
          link: 'https://дуксинауч.рф'
        },
      ]
    }
  },
})
</script>

<style scoped lang='scss'>
@import 'Services';
</style>
