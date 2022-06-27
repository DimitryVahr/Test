<template>
  <div class="shortFlightInfo">
    <div class="shortFlightInfo__title">
      <span class="from">{{ getFlightInfo.from }}</span> —
      <span class="to">{{ getFlightInfo.to }}</span>
    </div>
    <div v-if="getFlightInfo.dateTo" class="shortFlightInfo__item">
      <span class="shortFlightInfo__itemTitle">Туда</span>
      <span class="shortFlightInfo__itemText">
        {{ formatDate(getFlightInfo.dateTo) }}
      </span>
    </div>
    <div v-if="getFlightInfo.dateBack" class="shortFlightInfo__item">
      <span class="shortFlightInfo__itemTitle">Обратно</span>
      <span class="shortFlightInfo__itemText">
        {{ formatDate(getFlightInfo.dateBack) }}
      </span>
    </div>
    <div class="shortFlightInfo__item">
      <span class="shortFlightInfo__itemTitle">Пассажиры</span>
      <span class="shortFlightInfo__itemText">
        {{
          $utils.formatSimpleWord(getFlightInfo.passengers.length, 'пассажир')
        }}
      </span>
    </div>
    <div class="shortFlightInfo__item">
      <span class="shortFlightInfo__itemTitle">Общая стоимость билетов</span>
      <span class="shortFlightInfo__itemText">
        {{ $utils.formatSimpleWord(getFlightInfo.totalPrice, 'рубль') }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'ShortFlightInfo',
  methods: {
    formatDate(date: string): string {
      return format(parse(date, 'dd.MM.yyyy', new Date()), 'dd.MM.yyyy, iiii', {
        locale: ru
      })
    }
  },

  computed: {
    ...mapGetters(['getFlightInfo'])
  }
})
</script>

<style scoped lang="scss">
@import 'ShortFlightInfo';
</style>
