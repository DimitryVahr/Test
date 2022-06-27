<template>
  <div class="headerNav">
    <HeaderNavItem v-for="(item, i) in items" :key="item.title + i" :item="item"/>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import HeaderNavItem from './HeaderNavItem/HeaderNavItem.vue'
import { THeaderNavItem } from '../types'

export default defineComponent({
  components: { HeaderNavItem },
  name: 'HeaderNav',
  props: {
    /**
     * Пункты меню
     */
    items: {
      required: true,
      type: Array as PropType<THeaderNavItem[]>
    },
  }
})
</script>

<style scoped lang='scss'>
@import 'HeaderNav';
</style>
