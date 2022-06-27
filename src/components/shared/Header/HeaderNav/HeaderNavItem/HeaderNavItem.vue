<template>
  <div class="headerNavItem" :class="{'headerNavItem_opened': isDropdownShown}">
    <component
      :is="$utils.isTouchDevice() || item.onClick ? 'Button' : 'div'"
      :kind="$utils.isTouchDevice() || item.onClick ? 'Unstyled' : undefined"
      @click="
        $utils.isTouchDevice() ? setIsDropdownShown(true) : undefined,
        item.onClick ? item.onClick() : undefined
      "
      class="headerNavItem__head"
    >
      <router-link v-if="item.routeName" :to="{ name: item.routeName }" />
      <span class="headerNavItem__title">{{ item.title }}</span>
    </component>
    <div class="headerNavItem__dropdown" v-if="item.dropdownItems && item.dropdownItems.length">
      <HeaderNavDropdownItem v-for="(dropdown, i) in item.dropdownItems" :key="dropdown.title + i" :item="dropdown" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Button from '@ui/Button/Button.vue'
import HeaderNavDropdownItem from '../HeaderNavDropdownItem/HeaderNavDropdownItem.vue'
import { THeaderNavItem } from '../../types'

interface IData {
  isDropdownShown: boolean
}

export default defineComponent({
  components: { HeaderNavDropdownItem, Button },
  name: 'HeaderNavItem',
  props: {
    /**
     * Пункт меню
     */
    item: {
      required: true,
      type: Object as PropType<THeaderNavItem>
    },
  },

  data(): IData {
    return {
      isDropdownShown: false,
    }
  },

  methods: {
    setIsDropdownShown(toggle: boolean): void {
      this.isDropdownShown = toggle
    }
  },

  mounted() {
    document.documentElement.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target) && this.$el !== e.target) {
        this.setIsDropdownShown(false)
      }
    })
  }
})
</script>

<style scoped lang='scss'>
@import 'HeaderNavItem';
</style>
