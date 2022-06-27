<template>
  <div data-component='Input'>
    <div class="inputDefault" :class="inputDefaultClasses">
      <input
        class="inputDefault__input"
        :readonly="readonly"
        :autocomplete="autocomplete"
        v-model="inputValue"
        v-maska="mask"
        type="text"
        placeholder=" "
        :disabled="disabled"
      />
      <span class="inputDefault__placeholder">{{ label }}</span>

      <slot name="child-btn">
        <div
          @click="inputClear" class="buttonClear"
          :class="{ 'buttonClear--active': inputValue.length }"
        />
      </slot>
    </div>
    <span v-if="!!this.errorText" class="errorDescription">{{ errorText }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

interface IData {
  inputValue: string
}

export default defineComponent({
  name: 'Input',
  emits: ['update:inputModel'],
  props: {
    /**
     * Блокирует инпут
     */
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    /**
     * Скругленные края
     */
    isRound: {
      required: false,
      type: Boolean,
      default: false,
    },
    /**
     * Обычный белый инпут
     */
    isCommon: {
      required: false,
      type: Boolean,
      default: false,
    },
    /**
     * Значение инпута задаваемое разаботчиком
     */
    value: {
      required: false,
      type: String,
    },
    /**
     * Дополнительный класс
     */
    className: {
      required: false,
      type: String,
      default: '',
    },
    /**
     * Placeholder
     */
    label: {
      required: false,
      type: String
    },
    /**
     * Показать ошибку инпута (без текста)
     */
    isError: {
      required: false,
      type: Boolean,
      default: false,
    },
    /**
     * Error-Description
     */
    errorText: {
      required: false,
      type: String
    },
    /**
     * Маска для инпута
     */
    mask: {
      required: false,
      type: [String, Object],
      default: ''
    },
    /**
     * Контролирующая модель инпута (для задания значений из вне через v-model)
     */
    inputModel: {
      required: false,
      type: String,
      default: ''
    },
    /**
     * атрибут autocomplete (https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
     */
    autocomplete: {
      required: false,
      type: String,
      default: 'on'
    },
    /**
     * атрибут readonly
     */
    readonly: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data(): IData {
    return {
      inputValue: '',
    }
  },
  mounted() {
    this.inputValue = this.inputModel
  },
  watch: {
    value(): void {
      if (typeof this.value === 'string') {
        this.inputValue = this.value
      }
    },
    inputModel() {
      this.inputValue = this.inputModel
    },
    inputValue() {
      this.$emit('update:inputModel', this.inputValue)
    },
  },
  methods: {
    inputClear() {
      this.inputValue = ''
    },
  },
  computed: {
    inputDefaultClasses(): Record<string, boolean> {
      return {
        'inputDefault--disabled': this.disabled,
        'inputDefault--error': !!this.errorText || this.isError,
        'inputDefault--headBanner': this.isRound,
        'inputDefault--common': this.isCommon,
        [this.className]: true,
      }
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'Input.scss';
</style>
