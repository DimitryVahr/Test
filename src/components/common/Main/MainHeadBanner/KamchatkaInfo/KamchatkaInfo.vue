<template>
  <div class="kamchatkaInfo">
    <div class="kamchatkaInfo__info-item" v-if="prettyDegrees">
      <Icon height="0" width="0" :name="EIconNames.WeatherSun" class="kamchatkaInfo__weather-icon"/>
      <span class="kamchatkaInfo__text big">{{ prettyDegrees }}˚C</span>
    </div>

    <div class="kamchatkaInfo__info-item" v-if="prettyTime">
      <span class="kamchatkaInfo__text big">{{ prettyTime }}</span>
      <span class="kamchatkaInfo__text small">Камчатское<br/>время</span>
    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

interface IData {
  infoDegrees?: number | null,
  kamchatkaDate?: Date | null,
  kamchatkaDateInterval?: ReturnType<typeof setInterval>,
}

export default defineComponent({
  name: 'KamchatkaInfo',
  components: { Icon },
  data(): IData {
    return {
      infoDegrees: null,
      kamchatkaDate: null,
      kamchatkaDateInterval: undefined,
    }
  },

  methods: {
    formatNum(num: number): string {
      return num < 10 ? `0${num}` : `${num}`
    },

    incrementTime(): void {
      if (this.kamchatkaDate) {
        this.kamchatkaDate.setMinutes(this.kamchatkaDate.getMinutes() + 1)
        this.kamchatkaDate = new Date(this.kamchatkaDate)
      }
    }
  },

  computed: {
    prettyDegrees(): string | null {
      if (this.infoDegrees || this.infoDegrees === 0) {
        return this.infoDegrees > 0 ? `+${this.infoDegrees}` : `${this.infoDegrees}`
      }
      return null
    },

    prettyTime(): string | null {
      if (this.kamchatkaDate) {
        return `${this.formatNum(this.kamchatkaDate.getHours())}:${this.formatNum(this.kamchatkaDate.getMinutes())}`
      }
      return null
    }
  },

  mounted() {
    this.kamchatkaDate = new Date()
    this.kamchatkaDate.setHours(this.kamchatkaDate.getHours() + 12 + this.kamchatkaDate.getTimezoneOffset() / 60)
    setTimeout(() => {
      this.incrementTime()
      this.kamchatkaDateInterval = setInterval(this.incrementTime, 60000)
    }, 60000 - this.kamchatkaDate.getSeconds() * 1000)

    this.$services.getWeather({ q: 'Петропавловск-Камчатский' }).then((res) => {
      if (res.main) {
        this.infoDegrees = Math.round(res.main?.temp)
      }
    })
  },
  unmounted() {
    clearInterval(this.kamchatkaDateInterval as ReturnType<typeof setInterval>)
  }
})
</script>

<style scoped lang='scss'>
@import 'KamchatkaInfo';
</style>
