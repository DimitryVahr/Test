<template>
  <section class='documents'>
    <Container>
      <div class="documents__content">
        <h2 class="h2_large">Сертификаты, лицензии и&nbsp;документы</h2>
        <div class="documents__groups">
          <DocumentGroup v-for="(group, i) in licences" :key="group.title + i" :group="group" />
        </div>
        <div class="documents__politic" v-for="(politic, i) in politics" :key="politic.title + i">
          <h3 class="h3">{{ politic.title }}</h3>
          <div class="documents__politics">
            <DocsCard v-for="(doc, i) in politic.docs" :key="doc.text + i" :text="doc.text" :href="doc.href" :docSize="doc.docSize" />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import { IDocumentsGroup } from './types'
import DocumentGroup from './DocumentsGroup/DocumentsGroup.vue'
import DocsCard from '@/components/ui/Card/DocsCard.vue'

interface IData {
  licences: IDocumentsGroup[]
  politics: {
    title: string,
    docs: {
      text: string,
      href: string,
      docSize: string,
    }[]
  }[]
}

export default defineComponent({
  components: { Container, DocumentGroup, DocsCard },
  name: 'Documents',
  data(): IData {
    return {
      licences: [
        {
          title: 'Сертификат эксплуатанта',
          date: '1 сентября 2020',
          documentsImages: [
            { imgName: 'licence1', alt: 'Сертификат эксплуатанта' }
          ]
        },
        {
          title: 'Свидетельство эксплуатанта АОН',
          date: '27 июля 2017',
          documentsImages: [
            { imgName: 'licence6', alt: 'Лицензия на перевозку воздушным транспортом грузов' },
          ]
        },
        {
          title: 'Сертификат эксплуатанта по авиаработам',
          date: '21 мая 2021',
          documentsImages: [
            { imgName: 'licence7', alt: 'Лицензия на перевозку воздушным транспортом грузов' },
          ]
        }
      ],
      politics: [
        {
          title: 'Политика охраны труда',
          docs: [
            { text: 'Перечень рекомендуемых мероприятий по улучшению условий труда', href: './documents/vityaz-aero_better-working-conditions.pdf', docSize: '1.0 Мб' },
            { text: 'Результаты проведения специальной оценки условий труда', href: './documents/vityaz-aero_improvement-of-working-conditions.pdf', docSize: '0.5 Мб' },
          ]
        },
        {
          title: 'Политика в области качества\nи безопасности полетов',
          docs: [
            { text: 'Политика ООО АК «ВИТЯЗЬ - АЭРО»\nв области качества', href: './documents/vityaz-aero_qualityPolicy.pdf', docSize: '57 Кб' },
            { text: 'Политика ООО АК «ВИТЯЗЬ - АЭРО»\nв области безопасности полетов', href: './documents/vityaz-aero_flightSafetyPolicy.pdf', docSize: '57 Кб' },
          ]
        },
      ]
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'Documents';
</style>
