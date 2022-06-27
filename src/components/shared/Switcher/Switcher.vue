<template>
  <div class='switcher' data-component='Switcher'>
    <div class="switcher__items">
      <Button
        type="button"
        v-for="(item, i) in items"
        :key="item + i"
        kind="Unstyled"
        class="switcher__btn"
        :class="{switcher__btn_selected: item.selected}"
        @click="handleSwitcherChange(i)"
        :isDisabled="disabled"
      >
        {{ item.text }}
      </Button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Button from '@ui/Button/Button.vue'

export interface ISwitcherItem {
  text: string,
  selected?: boolean,
  type: string | number,
}

interface IData {
  switcherValue: null | string | number
}

export default defineComponent({
  name: 'Switcher',
  emits: [
    'update:switcherModel',
    'onChangeSelected',
  ],
  components: { Button },
  props: {
    /**
     * Элементы переключателя
     */
    items: {
      required: true,
      type: Array as PropType<ISwitcherItem[]>
    },
    /**
     * Индекс выбранного поля
     */
    switcherModel: {
      required: false,
      type: Number as PropType<number>,
      default: 0
    },
    /**
     * Неактивное состояние
     */
    disabled: {
      required: false,
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  data(): IData {
    return {
      switcherValue: null
    }
  },

  methods: {
    handleSwitcherChange(newSelectedIndex: number): void {
      const oldSelectedIndex = this.items.findIndex((item) => item.selected === true)

      if (oldSelectedIndex !== newSelectedIndex && oldSelectedIndex !== -1) {
        this.$emit('update:switcherModel', this.items[newSelectedIndex].type)
        this.$emit('onChangeSelected', this.items[newSelectedIndex].type)

        this.items[oldSelectedIndex].selected = false
        this.items[newSelectedIndex].selected = true
      }
    }
  },

  watch: {
    switcherModel() {
      this.switcherValue = this.switcherModel
    },
    switcherValue() {
      this.handleSwitcherChange(this.switcherModel)
    }
  },

  mounted() {
    this.switcherValue = this.switcherModel
  }
})
</script>

<style scoped lang='scss'>
@import 'Switcher';
</style>
