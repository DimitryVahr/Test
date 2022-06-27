<template>
  <div class="requisite">
    <span class="requisite__property">{{content.name}}</span>
    <span class="requisite__value">{{content.value}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IRequisite } from '../types'

export default defineComponent({
  name: 'Requisite',
  props: {
    /**
     * Название и данные реквизита
     */
    content: {
      required: true,
      type: Object as PropType<IRequisite>
    },
  },
})
</script>

<style scoped lang='scss'>
@import 'Requisite.scss';
</style>
