<template>
  <section class='stats'>
    <Container>
      <div class="stats__content">
        <div class="stats__company">
          <img src="@/assets/img/aboutCompany/companyName.png" alt="ВИТЯЗЬ-АЭРО" class="stats__company_desktop">
          <img src="@/assets/img/aboutCompany/companyNameMobile.png" alt="ВИТЯЗЬ-АЭРО" class="stats__company_mobile">
        </div>
        <div class="stats__items">
          <StatsItem v-for="(item, i) in statsItems" :key="item.title.text + i" :itemInfo="item" />
        </div>
      </div>
    </Container>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import StatsItem from './StatsItem/StatsItem.vue'
import { IStat } from './types'

interface IData {
  statsItems: IStat[]
}

export default defineComponent({
  components: { Container, StatsItem },
  name: 'Stats',
  data(): IData {
    return {
      statsItems: [
        {
          title: { amount: 2009, text: 'год\nоснования' },
          description: ['Авиакомпания «ВИТЯЗЬ-АЭРО» основана, чтобы помочь рыбопромышленной компании «Витязь-Авто» — нужно было связать областной центр и заводы предприятия в отдаленных районах Камчатки.']
        },
        {
          title: { amount: 23, text: 'вертолета\nв авиапарке' },
          description: ['Ми-8 модификаций МТВ, АМТ, Т и ПС и Ми-2.', 'Количество машин меняется из года в год — мы закупаем новые и списываем исчерпавшие свой ресурс.', 'Выполняем рейсы в отдаленные населенные пункты Камчатки, работаем по госконтрактам совместно с МЧС России, медициной катастроф, КамчатНИРО, Агентством лесного хозяйства…']
        },
        {
          title: { amount: 65, text: 'человек постоянного\nлетного состава' },
          description: ['Успех авиакомпании во многом обязан квалифицированному летному составу, способному выполнять все задания в пределах возможностей эксплуатируемого типа воздушного судна.']
        }
      ]
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'Stats';
</style>
