<template>
  <Container>
    <HeadBanner text="Правила перевозок и&nbsp;документы"/>
    <InfoBlock title="Информация о&nbsp;страховщике">
      <template v-slot:slot1>
        <span class="infoInsurer" >Номер договора: SOGX22158922885000</span>
        <span class="infoInsurer">Договор обязательного страхования гражданской ответственности перевозчика за причинение вреда жизни, здоровью, имуществу пассажиров</span>
        <span class="infoInsurer">Наименование Страховщика: ООО «СК «Согласие»</span>
        <span class="infoInsurer">Адрес: 129110, г. Москва, ул. Гиляровского, 42</span>
        <span class="infoInsurer">Почтовый адрес: 129110, г. Москва, ул. Гиляровского, 42</span>
        <span class="infoInsurer">Телефон: +7(495) 009-00-01</span>
        <span class="infoInsurer">Начало действия договора: 20.05.2021</span>
        <span class="infoInsurer">Срок действия договора: 20.05.2021 – 19.05.2022</span>
      </template>
    </InfoBlock>
    <InfoBlock title="Правила перевозок" description="Основные условия договора авиационной перевозки">
      <template v-slot:slot1>
        <DocsCard docSize="0.6 Мб" href="./documents/vityaz-aero_transportationRules.pdf" text='Правила перевозки пассажиров, багажа и грузов ООО АК "ВИТЯЗЬ-АЭРО"'/>
      </template>
    </InfoBlock>
    <InfoBlock  title="Документы" description="">
      <template v-slot:slot1>
        <DocsCard docSize="36 Кб" href="./documents/vityaz-aero_loadPassApplication.docx" download text="Заявка на полет, сводная загрузочная ведомость и грузовая накладная"/>
      </template>
    </InfoBlock>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeadBanner from '@ui/HeadBanner/HeadBanner.vue'
import InfoBlock from '@ui/InfoBlock/InfoBlock.vue'
import DocsCard from '@ui/Card/DocsCard.vue'
import Container from '@shared/Container/Container.vue'

export default defineComponent({
  name: 'TransportationRules',
  components: {
    HeadBanner,
    Container,
    InfoBlock,
    DocsCard,
  }
})
</script>

<style scoped lang='scss'>
@import 'TransportationRules';
</style>
