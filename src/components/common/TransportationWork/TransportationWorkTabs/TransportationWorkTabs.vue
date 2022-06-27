<template>
  <div class='transportationWorkTabs'>
    <div class="transportationWorkTabs__btns">
      <Button v-for="(helicopter, i) in heliTabs" :key="i" @click="selectHeli(i)" kind="FullUnstyled" class="transportationWorkTabs__btn" :class="{'transportationWorkTabs__btn--selected':helicopter.selected}">
        <img :src="require(`@/assets/img/airWork/heliTabs/${heliTabs[i].img}.png`)" alt="">
        <div class="transportationWorkTabs__heliName">{{heliTabs[i].heliName}}</div>
      </Button>
    </div>
    <div class="transportationWorkTabs__stats">
      <div class="transportationWorkTabs__statsItemWrap">
        <div  class="transportationWorkTabs__statsItem">
          {{selectedHelicopter.stats.capacity || '-'}}
          <span class="transportationWorkTabs__statsDescription">Максимальная вместительность</span>
        </div>
        <div  class="transportationWorkTabs__statsItem">
          {{selectedHelicopter.stats.lifting || '-'}}
          <span class="transportationWorkTabs__statsDescription">Максимальная грузоподъёмность</span>
        </div>
        <div class="transportationWorkTabs__statsItem">
          {{selectedHelicopter.stats.distance || '-'}}
          <span class="transportationWorkTabs__statsDescription">Максимальная дальность перелета</span>
        </div>
      </div>
      <div class="transportationWorkTabs__statsItemWrap">
        <div class="transportationWorkTabs__statsItem">
          {{selectedHelicopter.stats.speed || '-'}}
          <span class="transportationWorkTabs__statsDescription">Максимальная скорость полета</span>
        </div>
        <div class="transportationWorkTabs__statsItem">
          {{selectedHelicopter.stats.height || '-'}}
          <span class="transportationWorkTabs__statsDescription">Максимальная высота полета</span>
        </div>
        <div class="transportationWorkTabs__statsItem">
          {{selectedHelicopter.stats.durationTime || '-' }}
          <span class="transportationWorkTabs__statsDescription">Максимальное ходовое время без дозаправки</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'

interface IData {
  heliTabs: {
    img:string,
    heliName: string,
    stats: {
      capacity: string,
      lifting: string,
      distance: string,
      speed: string,
      height: string,
      durationTime: string
    }
    selected?: boolean
  }[]
}

export default defineComponent({
  name: 'TransportationWorkTabs',
  components: {
    Button
  },
  data: () : IData => {
    return {
      heliTabs: [
        {
          img: 'heli1',
          heliName: 'Ми-8МТВ-1',
          stats: {
            capacity: '26 человек',
            lifting: '4 000 кг',
            distance: '590 км',
            speed: '240 км/ч',
            height: '6 000 м',
            durationTime: '4 часа'
          },
          selected: true
        },
        {
          img: 'heli2',
          heliName: 'Ми-8Т',
          stats: {
            capacity: '22 человека',
            lifting: '4 000 кг',
            distance: '480 км',
            speed: '225 км/ч',
            height: '4 500 м',
            durationTime: ''
          },
          selected: false
        },
        {
          img: 'heli3',
          heliName: 'Ми-8П',
          stats: {
            capacity: '24 человека',
            lifting: '3 000 кг',
            distance: '425 км',
            speed: '225 км/ч',
            height: '4 200 м',
            durationTime: ''
          },
          selected: false
        },
        {
          img: 'heli4',
          heliName: 'Ми-2',
          stats: {
            capacity: '6 человек',
            lifting: '700 кг',
            distance: '270 км',
            speed: '190 км/ч',
            height: '4 000',
            durationTime: ''
          },
          selected: false
        },
        {
          img: 'heli5',
          heliName: 'МИ-8МТВ-1 VIP',
          stats: {
            capacity: '9 человек',
            lifting: '4 000 кг',
            distance: '590 км',
            speed: '240 км/ч',
            height: '6 000м',
            durationTime: ''
          },
          selected: false
        },
      ],
    }
  },

  methods: {
    selectHeli(i:number) {
      this.heliTabs.forEach((item) => {
        item.selected = false
      })
      this.heliTabs[i].selected = true
    }
  },

  computed: {
    selectedHelicopter() {
      return this.heliTabs.find((item) => item.selected)
    },
  }
})
</script>

<style scoped lang='scss'>
@import 'TransportationWorkTabs';
</style>
