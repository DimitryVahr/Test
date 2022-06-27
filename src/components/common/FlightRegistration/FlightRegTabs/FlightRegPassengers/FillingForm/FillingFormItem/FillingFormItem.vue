<template>
  <div class="fillingFormItem" :class="classes">
    <div class="fillingFormItem__icon"></div>
    <a
      v-if="tip !== ''"
      :href="`#${href}`"
      class="fillingFormItem__text"
      v-tippy="tippyData"
    >
      {{ text }}
    </a>
    <a v-else :href="`#${href}`" class="fillingFormItem__text">
      {{ text }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FillingFormItem',
  props: {
    success: {
      required: false,
      type: Boolean,
      default: false
    },
    error: {
      required: false,
      type: Boolean,
      default: false
    },
    text: {
      required: false,
      type: String
    },
    href: {
      required: true,
      type: String
    },
    tip: {
      required: false,
      type: String,
      default: ''
    }
  },
  computed: {
    classes(): Record<string, boolean> {
      return {
        'fillingFormItem--success': this.success,
        'fillingFormItem--error': this.error
      }
    },

    tippyData() {
      return {
        content: this.tip,
        placement: 'right'
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import 'FillingFormItem';
</style>
