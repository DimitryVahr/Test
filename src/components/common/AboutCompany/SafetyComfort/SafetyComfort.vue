<template>
  <section class='safetyComfort'>
    <Container>
      <div class="safetyComfort__content">
        <h2 class="h2_large">Обеспечиваем безопасность полетов и&nbsp;комфорт пассажиров</h2>
        <div class="safetyComfort__cards">
          <SafetyComfortCard v-for="(card, i) in safetyComfortInfo" :key="card.title + i" :cardInfo="card" />
        </div>
      </div>
    </Container>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import SafetyComfortCard from './SafetyComfortCard/SafetyComfortCard.vue'
import { ISafetyComfortCard } from './types'

interface IData {
  safetyComfortInfo: ISafetyComfortCard[]
}

export default defineComponent({
  components: { Container, SafetyComfortCard },
  name: 'SafetyComfort',
  data(): IData {
    return {
      safetyComfortInfo: [
        { title: 'Система контроля качества', text: 'Каждый сотрудник проходит повышение квалификации и учится методам управления качеством. Совершенствуя систему контроля качества мы стремимся к предупреждению опасностей и несоответствий.' },
        { title: 'Оценка поставщиков', text: 'Безопасность полетов, комфорт пассажиров и качество технического обслуживания воздушных судов в немалой степени зависят от наших поставщиков. Мы систематически оцениваем качество топлива, запасных частей, аэронавигационной и метеорологической информации.' }
      ]
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'SafetyComfort';
</style>
