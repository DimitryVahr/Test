<template>
  <section class='partners'>
    <Container>
      <div class="partners__content_desktop">
        <PartnerCard v-for="(card, i) in partnersCardsDesktop" :key="card.name + i" :content="card" />
      </div>
      <div class="partners__content_mobile">
        <PartnerCard v-for="(card, i) in partnersCardsMobile" :key="card.name + i" :content="card" />
      </div>
    </Container>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import { IPartnerCard } from './types'
import PartnerCard from './PartnerCard/PartnerCard.vue'

interface IData {
  partnersCardsDesktop: IPartnerCard[],
  partnersCardsMobile: IPartnerCard[]
}

export default defineComponent({
  components: { Container, PartnerCard },
  name: 'Partners',
  data(): IData {
    return {
      partnersCardsDesktop: [
        {
          name: 'Туристический оператор Витязь Тревел',
          description: 'Организует туры и экскурсии\nна Камчатке',
          link: 'https://vityaz.travel',
          logoImgName: 'partner1'
        },
        {
          name: 'Кроноцкий заповедник',
          description: 'Экскурсии по местам с редкими флорой и фауной',
          link: 'https://kronoki.ru',
          logoImgName: 'partner2'
        },
        {
          name: 'Горный приют Святого Тимона',
          description: 'Организует туры хелиски на Камчатке',
          link: 'https://saint-timon.com',
          logoImgName: 'partner3'
        },
        {
          name: 'МЧС России',
          description: 'Министерство РФ по делам гражданской обороны, чрезвычайным ситуациям и ликвидации последствий стихийных бедствий',
          link: 'https://www.mchs.gov.ru',
          logoImgName: 'partner4'
        },
      ],
      partnersCardsMobile: [
        {
          name: 'Туроператор Витязь-Тревел',
          link: 'https://vityaz.travel',
          logoImgName: 'partner5',
          fullWidthLogo: true,
        },
        {
          name: 'Горный приют Святого Тимона',
          link: 'https://saint-timon.com',
          logoImgName: 'partner3'
        },
        {
          name: 'МЧС РФ',
          link: 'https://www.mchs.gov.ru',
          logoImgName: 'partner4'
        },
        {
          name: 'Кроноцкий заповедник',
          link: 'https://kronoki.ru',
          logoImgName: 'partner2'
        },
      ]
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'Partners';
</style>
