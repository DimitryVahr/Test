<template>
  <div class="mobileMenuItem" :class="itemClasses">
    <div class="mobileMenuItem__head">
      <Button
        class="mobileMenuItem__title"
        kind="Unstyled"
        @click="
          item.dropdownItems &&
          item.dropdownItems.length &&
          !item.isAccount
            ? toggleAccordion()
            : null,
            item.onClick ? item.onClick() : undefined
        "
      >
        <router-link v-if="item.routeName" :to="{ name: item.routeName }" />
        <Icon
          class="mobileMenuItem__icon"
          :width="24"
          :height="24"
          :name="
            item.dropdownItems &&
            item.dropdownItems.length &&
            !item.isAccount
              ? EIconNames.ChevronRight
              : EIconNames[item.mobileMenuIcon]
          "
        />
        <span>{{ item.title }}</span>
      </Button>
      <Button
        v-if="item.routeName === 'AccountProfile'"
        kind="Unstyled"
        class="mobileMenuItem__logout"
        @click="logOut"
        >Выйти</Button
      >
    </div>
    <div
      class="mobileMenuItem__accordion"
      v-if="
        item.dropdownItems &&
          item.dropdownItems.length
      "
    >
      <MobileMenuAccordionItem
        v-for="(accordItem, i) in item.dropdownItems"
        :key="accordItem.title + i"
        :item="accordItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { THeaderNavItem } from '../../types'
import MobileMenuAccordionItem from '../MobileMenuAccordionItem/MobileMenuAccordionItem.vue'

interface IData {
  isOpened: boolean
}

export default defineComponent({
  components: { Icon, MobileMenuAccordionItem, Button },
  name: 'MobileMenuItem',
  props: {
    /**
     * Пункт меню
     */
    item: {
      required: true,
      type: Object as PropType<THeaderNavItem>
    }
  },
  data(): IData {
    return {
      isOpened: false
    }
  },

  methods: {
    toggleAccordion(): void {
      this.isOpened = !this.isOpened
    },

    logOut(): void {
      this.$router.push({ name: 'Main' }).then(() => {
        this.$store.commit('mutUserInfo', {})
        this.$store.commit('mutAuthKey', '')
        localStorage.removeItem('authKey')
      })
    }
  },

  computed: {
    itemClasses() {
      return {
        mobileMenuItem_opened: this.isOpened,
        mobileMenuItem_single: this.item?.mobileMenuIcon
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import 'MobileMenuItem';
</style>
