<template>
  <div :class="counterClasses">
    <Button
      class="counter__button"
      type="button"
      kind="Unstyled"
      @click="reduceCount"
      :disabled="counterValue === minValue"
    >
      <Icon :width="24" :height="24" :name="EIconNames.Minus" />
    </Button>
    <b class="counter__value">
      {{ counterValue }}
      <span class="counter__label">{{ label }}</span>
    </b>
    <div v-tippy="tippyData">
      <Button
        :class="incrementButtonClasses"
        type="button"
        kind="Unstyled"
        @click="increaseCount"
        :disabled="isIncrementDisabled && $utils.getScreenWidth() >= 768"
      >
        <Icon :width="24" :height="24" :name="EIconNames.Plus" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'

type TCounterKind = 'Primary' | 'Secondary'

interface IData {
  counterValue?: null | number
}

export default defineComponent({
  name: 'Counter',
  components: { Button, Icon },
  emits: ['update:counterModel'],
  props: {
    /**
     * Шаг счетчика
     */
    step: {
      required: false,
      type: Number as PropType<number>,
      default: 1
    },
    /**
     * Название считаемого
     */
    label: {
      required: true,
      type: String as PropType<string>
    },
    /**
     * Значение счетчика
     */
    counterModel: {
      required: true,
      type: Number as PropType<number>
    },
    /**
     * Максимальное значение
     */
    maxValue: {
      required: false,
      type: Number as PropType<number>,
      default: 1002
    },
    /**
     * Минимальное значение
     */
    minValue: {
      required: false,
      type: Number as PropType<number>,
      default: 0
    },
    /**
     * Тип счетчика
     */
    kind: {
      requred: true,
      type: String as PropType<TCounterKind>
    },
    /**
     * Алерт при неактивном добавлении
     */
    tipOnIncrementDisabled: {
      required: false,
      type: String as PropType<string>,
      default: ''
    }
  },

  data(): IData {
    return {
      counterValue: null
    }
  },

  methods: {
    reduceCount(): void {
      if (this.counterValue !== undefined && this.counterValue !== null) {
        this.counterValue
          -= this.step < this.counterValue ? this.step : this.counterValue
      }
    },

    increaseCount(): void {
      if (
        this.tipOnIncrementDisabled !== ''
        && this.$utils.getScreenWidth() < 768
        && this.isIncrementDisabled
      ) {
        this.$store.commit('mutAlertText', this.tipOnIncrementDisabled)
        return
      }
      if (this.counterValue !== undefined && this.counterValue !== null) {
        this.counterValue
          += this.availableValue > this.step ? this.step : this.availableValue
      }
    }
  },

  computed: {
    availableValue(): number {
      return this.counterValue !== undefined && this.counterValue !== null
        ? this.maxValue - this.counterValue
        : 0
    },

    counterClasses(): Record<string, boolean> {
      return {
        counter: true,
        [`counter${this.kind}`]: true
      }
    },

    incrementButtonClasses(): Record<string, boolean> {
      return {
        counter__button: true,
        counter__button_disabled: this.isIncrementDisabled
      }
    },

    isIncrementDisabled(): boolean {
      return this.counterValue === this.maxValue
    },

    tippyData() {
      return {
        content:
          this.isIncrementDisabled && this.$utils.getScreenWidth() >= 768
            ? this.tipOnIncrementDisabled
            : ''
      }
    }
  },

  watch: {
    counterModel() {
      this.counterValue = this.counterModel
    },
    counterValue() {
      this.$emit('update:counterModel', this.counterValue)
    }
  },

  mounted() {
    this.counterValue = this.counterModel
  }
})
</script>

<style scoped lang="scss">
@import 'Counter';
</style>
