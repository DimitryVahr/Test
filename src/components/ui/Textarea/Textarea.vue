<template>
  <div data-component='Textarea'>
    <div class="inputText" :class="textareaClasses">
      <textarea
        @input="autoResize"
        class="inputText__input"
        type="text"
        placeholder=" "
        rows="3"
        :readonly="this.disabled"
        v-model="textareaValue"
      />
      <span class="inputText__placeholder">{{ label }}</span>
    </div>
    <span class="errorDescription">{{ errorText }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

interface IData {
  textareaValue: string
}

export default defineComponent({
  name: 'Textarea',
  emits: ['update:textareaModel'],
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
     * Error-Description
     */
    errorText: {
      required: false,
      type: String
    },
    /**
     * Ошибка
     */
    isError: {
      required: false,
      type: Boolean,
      default: false,
    },
    /**
     * Контролирующая модель инпута (для задания значений из вне через v-model)
     */
    textareaModel: {
      required: false,
      type: String,
      default: ''
    }
  },
  data: (): IData => {
    return {
      textareaValue: ''
    }
  },
  methods: {
    autoResize(e: Event) {
      const etarget = e.target as HTMLInputElement
      etarget.style.height = 'auto'
      etarget.style.height = `${ etarget.scrollHeight + 2 }px`
    }
  },
  mounted() {
    this.textareaValue = this.textareaModel
  },
  computed: {
    textareaClasses(): Record<string, boolean> {
      return {
        'inputText--disabled': this.disabled,
        'inputText--error': !!this.errorText || this.isError,
        'inputText--headBanner': this.isRound,
        [this.className]: true
      }
    }
  },
  watch: {
    textareaModel() {
      this.textareaValue = this.textareaModel
    },
    textareaValue() {
      this.$emit('update:textareaModel', this.textareaValue)
    },
  },
})
</script>

<style scoped lang='scss'>
@import 'Textarea.scss';
</style>
