<template>
  <div :class="{'selectItem--selected':item.selected}" class="selectItem">
    {{ item.label }}
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { ISelectItem } from '@/models/breadcrumbs'

export default defineComponent({
  name: 'SelectItem',
  props: {
    item: {
      required: true,
      type: Object as PropType<ISelectItem>
    }
  },
  data() {
    return {
      inputValue: '',
    }
  },
})
</script>

<style scoped lang='scss'>
@import 'SelectItem.scss';
</style>
