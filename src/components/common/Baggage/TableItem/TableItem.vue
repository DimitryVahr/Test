<template>
  <div class="tableItem">
    <span class="tableItem__route">{{route}}</span>
    <span class="tableItem__weight">{{weight}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Baggage',

  props: {
    /**
     * Маршрут
     */
    route: {
      required: true,
      type: String
    },
    /**
     * Разрешенный вес
     */
    weight: {
      required: true,
      type: String
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'TableItem.scss';
</style>
