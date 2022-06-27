<template>
  <div class="mobileMenuAccordionItem" :class="accordionItemClasses">
    <component :is="item.routeName ? 'router-link' : 'a'" :href="item.href ? item.href : undefined" :target="item.href ? '_blank' : undefined" :to="{ name: item.routeName ? item.routeName : undefined }">
      <span class="mobileMenuAccordionItem__title">
        {{ item.title }}
        <Icon v-if="item.icon" class="mobileMenuAccordionItem__icon" :width="16" :height="16" :name="EIconNames[item.icon]" />
      </span>
    </component>
  </div>
</template>

<script lang='ts'>
import Icon from '@ui/Icon/Icon.vue'
import { defineComponent, PropType } from 'vue'
import { THeaderNavDropdownItem } from '../../types'

export default defineComponent({
  components: { Icon },
  name: 'MobileMenuAccordionItem',
  props: {
    /**
     * Подпункт меню
     */
    item: {
      required: true,
      type: Object as PropType<THeaderNavDropdownItem>
    }
  },

  computed: {
    accordionItemClasses() {
      return {
        mobileMenuAccordionItem_current: this.$router.currentRoute.value.name === this.item?.routeName
      }
    }
  },
})
</script>

<style scoped lang='scss'>
@import 'MobileMenuAccordionItem';
</style>
