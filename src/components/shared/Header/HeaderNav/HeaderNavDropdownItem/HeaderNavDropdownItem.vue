<template>
  <div class="headerNavDropdownItem">
    <component
      :is="definedComponent"
      :href="item.href ? item.href : undefined"
      :target="item.href ? '_blank' : undefined"
      :kind="definedComponent === 'Button' ? 'Unstyled' : undefined"
      @click="item.onClick ? item.onClick() : undefined"
      :to="item.routeName ? { name: item.routeName } : undefined"
    >
      <span class="headerNavDropdownItem__title">
        {{ item.title }}
        <Icon
          v-if="item.icon"
          class="headerNavDropdownItem__icon"
          :width="16"
          :height="16"
          :name="EIconNames[item.icon]"
        />
      </span>
    </component>
  </div>
</template>

<script lang="ts">
import Icon from '@ui/Icon/Icon.vue'
import { defineComponent, PropType } from 'vue'
import Button from '@ui/Button/Button.vue'
import { THeaderNavDropdownItem } from '../../types'

export default defineComponent({
  components: { Icon, Button },
  name: 'HeaderNavDropdownItem',
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
    definedComponent() {
      if (this.item.routeName) return 'router-link'
      if (this.item.href) return 'a'
      if (this.item.onClick) return 'Button'
      return 'a'
    }
  }
})
</script>

<style scoped lang="scss">
@import 'HeaderNavDropdownItem';
</style>
