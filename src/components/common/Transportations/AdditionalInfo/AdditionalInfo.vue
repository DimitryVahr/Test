<template>
  <section class="additionalInfo">
    <Container class="additionalInfo__container">
      <div class="additionalInfo__content">
        <AdditionalInfoCard v-for="(card, i) in additionalInfo" :key="card.title + i" :info="card" />
      </div>
    </Container>
    <Container class="additionalInfo__button--mobileContainer">
      <Button class="additionalInfo__button--mobile" kind="Primary">Записаться на рейс</Button>
    </Container>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Container from '@shared/Container/Container.vue'
import AdditionalInfoCard from './AdditionalInfoCard/AdditionalInfoCard.vue'
import { IAdditionalInfoCard } from './types'

interface IData {
  additionalInfo: IAdditionalInfoCard[]
}

export default defineComponent({
  components: { Container, AdditionalInfoCard, Button },
  name: 'AdditionalInfo',
  data(): IData {
    return {
      additionalInfo: [
        {
          icon: 'BlueBgDiscount',
          title: 'Субсидированные перевозки населения',
          text: [
            'С июня 2015 года осуществляем пассажирские перевозки по сниженным тарифам для жителей Камчатского края.',
            'Для пассажиров, вылетающих с Николаевки в отдаленные районы, предоставляется бесплатный трансфер с автостанции 10 км г. П.-Камчатского и в обратном направлении. Также бесплатный трансфер предоставляется для пассажиров, летящих из с. Эссо и п. Козыревск и в обратном направлении. '
          ],
          button: 'Записаться на рейс'
        },
        {
          icon: 'BlueBgBaggageCheck',
          title: 'Багаж досматривают сотрудники службы безопасности',
          text: [
            'Это требуют меры обеспечения безопасности. Поэтому всем пассажирам рекомендуем ознакомиться с правилами авиаперевозок. Норма бесплатного провоза багажа составляет от 20 до 30 кг в зависимости от направления перелета.'
          ],
          link: {
            text: 'Правила провоза багажа',
            routeName: 'BaggageRules'
          }
        }
      ]
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'AdditionalInfo';
</style>
