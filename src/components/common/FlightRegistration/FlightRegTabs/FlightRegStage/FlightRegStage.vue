<template>
  <Container>
    <div class="flightRegStage__wrapper">
      <span
        class="flightRegStage__stage"
        :class="{
          flightRegStage__stage_current:
            getFlightRegStep === EFlightRegStages.Tariffs
        }"
      >
        Тарифы
      </span>
      <Icon
        :height="16"
        :width="16"
        :name="EIconNames.ArrowRight"
        class="flightRegStage__arrow"
      />
      <span
        class="flightRegStage__stage"
        :class="{
          flightRegStage__stage_current:
            getFlightRegStep === EFlightRegStages.Passengers
        }"
      >
        Пассажиры
      </span>
      <Icon
        :height="16"
        :width="16"
        :name="EIconNames.ArrowRight"
        class="flightRegStage__arrow"
      />
      <span
        class="flightRegStage__stage"
        :class="{
          flightRegStage__stage_current:
            getFlightRegStep === EFlightRegStages.Success
        }"
      >
        Подтверждение
      </span>
    </div>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Icon from '@ui/Icon/Icon.vue'
import Container from '@shared/Container/Container.vue'
import { EFlightRegStages } from '@/models/flightRegistration/regSteps'

interface IData {
  EFlightRegStages: typeof EFlightRegStages
}

export default defineComponent({
  name: 'FlightRegStage',
  components: { Container, Icon },
  data: (): IData => {
    return {
      EFlightRegStages
    }
  },
  computed: {
    ...mapGetters(['getFlightRegStep'])
  }
})
</script>

<style scoped lang="scss">
@import 'FlightRegStage';
</style>
