<template>
  <svg :width="width" :height="height">
    <use :xlink:href="createXlinkHref"/>
  </svg>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { EIconNames } from '@ui/Icon/types'

export default defineComponent({
  name: 'Icon',
  props: {
    /**
     * Ширина
     */
    width: {
      required: true,
      type: [Number, String]
    },
    /**
     * Высота
     */
    height: {
      required: true,
      type: [Number, String]
    },
    /**
     * Наименование иконки
     */
    name: {
      required: true,
      type: String as () => EIconNames
    }
  },
  computed: {
    createXlinkHref(): string {
      return `#${ this.name }_icon`
    },
  }
})
</script>
