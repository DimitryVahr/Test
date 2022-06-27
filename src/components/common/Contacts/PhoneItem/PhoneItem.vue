<template>
  <a class="phoneItem" :href="`tel:${number}`">
    <Icon class="phoneItem__icon" :width="24" :height="24" :name="EIconNames.Phone"/>
    <div>
      <span class="phoneItem__number">{{number}}</span>
      <span v-if="description" class="phoneItem__description">{{description}}</span>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  name: 'PhoneItem',

  components: {
    Icon,
  },

  props: {
    /**
     * Номер телефона
     */
    number: {
      required: true,
      type: String
    },
    /**
     * Описание
     */
    description: {
      required: false,
      type: String
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'PhoneItem.scss';
</style>
