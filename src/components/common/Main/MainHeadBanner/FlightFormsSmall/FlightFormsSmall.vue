<template>

  <div>
    <div class="flightFormsSmall__togglers">
      <Button
        v-for="toggler in formTogglers"
        :key="`formToggler-${toggler.formName}`"
        kind="Unstyled"
        :class="{'flightFormsSmall__toggle-btn': true, 'active': toggler.formName === activeFormName}"
        @click="activeFormName = toggler.formName"
      >
        <span
          :class="{'flightFormsSmall__toggle-text': true, 'hide-in-mobile': !!toggler.togglerTitleMobile}">
          {{ toggler.togglerTitle }}
        </span>
        <span class="flightFormsSmall__toggle-text mobile" v-if="toggler.togglerTitleMobile">
          {{ toggler.togglerTitleMobile }}
        </span>
        <InfoDot class="flightFormsSmall__info-dot" :content="toggler.infoDotText"/>
      </Button>
    </div>

    <transition name="fadeFaster" mode="out-in">
      <component :is="activeFormName"/>
    </transition>
  </div>

</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import InfoDot from '@ui/InfoDot/InfoDot.vue'
import PassengerTransportationSmallForm
  from '@common/Main/MainHeadBanner/FlightFormsSmall/PassengerTransportationSmallForm.vue'
import HelicopterOrderSmallForm
  from '@common/Main/MainHeadBanner/FlightFormsSmall/HelicopterOrderSmallForm.vue'

type TSmallFlightFormNames = 'PassengerTransportationSmallForm' | 'HelicopterOrderSmallForm'

interface IFlightFormToggler {
  formName: TSmallFlightFormNames,
  togglerTitle: string,
  togglerTitleMobile?: string,
  infoDotText: string
}

interface IData {
  formTogglers: IFlightFormToggler[]
  activeFormName: TSmallFlightFormNames
}

export default defineComponent({
  name: 'FlightFormsSmall',
  components: {
    InfoDot,
    Button,
    PassengerTransportationSmallForm,
    HelicopterOrderSmallForm,
  },
  data: (): IData => {
    return {
      formTogglers: [
        {
          formName: 'PassengerTransportationSmallForm',
          togglerTitle: 'Пассажирские перевозки',
          togglerTitleMobile: 'Пасс. перевозки',
          infoDotText: 'Запись на регулярные маршруты, имеющие стабильное расписание.'
        },
        {
          formName: 'HelicopterOrderSmallForm',
          togglerTitle: 'Заказ вертолета',
          infoDotText: 'Если вам нужно заказать перелет по&nbsp;индивидуальному маршруту, то&nbsp;воспользуйтесь этой вкладкой.'
        },
      ],
      activeFormName: 'PassengerTransportationSmallForm',
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'FlightFormsSmall';
</style>
