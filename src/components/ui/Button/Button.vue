<template>
  <button
    :class="buttonClasses"
    :disabled="isDisabled"
    @click="!isDisabled && $emit('click')"
  >
    <slot/>
  </button>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'

type TButtonsKind = 'Primary' | 'Secondary' | 'Unstyled' | 'FullUnstyled' | 'Link'

export default defineComponent({
  name: 'Button',
  emits: ['click'],
  props: {
    /**
     * Вид кнопки ('Primary' | 'Secondary' | 'Unstyled')
     */
    kind: {
      required: true,
      type: String as PropType<TButtonsKind>
    },
    /**
     * Дополнительный класс кнопки
     */
    className: {
      required: false,
      type: String,
      default: ''
    },
    /**
     * Должна ли кнопка растягиваться на все свободное пространство
     */
    isFluid: {
      required: false,
      type: Boolean,
      default: false
    },
    /**
     * Должна ли кнопка растягиваться на все свободное пространство в адаптиве
     */
    isFluidMobile: {
      required: false,
      type: Boolean,
      default: false
    },
    /**
     * Заблокирована ли кнопка
     */
    isDisabled: {
      required: false,
      type: Boolean,
      default: false
    },
    /**
     * Нужно ли убрать border кнопки
     */
    noBorder: {
      required: false,
      type: Boolean,
      default: false
    },
    /**
     * Выравнивает иконку вместе с текстом
     */
    withIcon: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses(): Record<string, unknown> {
      return {
        button: true,
        [`button${ this.kind }`]: true,
        [this.className]: true,
        button_fluid: this.isFluid,
        button_fluidMobile: this.isFluidMobile,
        button_noBorder: this.noBorder,
        button_withIcon: this.withIcon,
      }
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'Button.scss';
</style>
