<template>
  <div data-component='Input'>
    <div class="inputDefault inputDefault_autocomplete" :class="inputDefaultClasses">
      <input
        class="inputDefault__input"
        v-model="inputValue"
        v-maska="mask"
        type="text"
        placeholder=" "
        @blur="onBlur"
        @keyup.esc="onEscape"
      />
      <span class="inputDefault__placeholder">{{ label }}</span>

      <slot name="child-btn">
        <div
          @click="inputClear" class="buttonClear"
          :class="{ 'buttonClear--active': inputValue.length }"
        />
      </slot>
      <ul class="input__suggestions" v-show="isOpen && inputModel">
        <li class="input__suggestion" v-if="inputModel && isLoading">
          <span class="input__suggestion-tip">Данные загружаются...</span>
        </li>
        <li class="input__suggestion" v-else-if="inputModel && suggestions.length === 0">
          <span class="input__suggestion-tip">Ничего не найдено</span>
        </li>
        <li
          class="input__suggestion input__suggestion_hoverable"
          v-for="(item, i) in suggestions"
          :key="item.value + i"
        >
          <a @click="select(item)">
            {{ item.value }}
            <span class="input__suggestion-subfield">{{ item.data[autocompleteConfig.subfield] }}</span>
          </a>
        </li>
      </ul>
    </div>
    <span v-if="!!this.errorText" class="errorDescription">{{ errorText }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { IAutocompleteConfig } from './types'
import { ISuggestionsService } from '@/services/api/suggestionsService'
import { ISuggestion } from '@/models/forms/authForms'

// type TSuggestionsResponse = ISuggestionsPartyResponse | ISuggestionsBankResponse | null

interface IData {
  inputValue: string,
  isLoading: boolean,
  suggestions: ISuggestion[],
  isOpen: boolean,
}

export default defineComponent({
  name: 'InputAutocomplete',
  emits: ['update:inputModel', 'onSelect'],
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
      type: String,
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
     * Конфигурация для вызова апи автозаполнения
     */
    autocompleteConfig: {
      required: true,
      type: Object as PropType<IAutocompleteConfig>
    }
  },
  data(): IData {
    return {
      inputValue: '',
      isLoading: false,
      suggestions: [],
      isOpen: false,
    }
  },
  mounted() {
    this.inputValue = this.inputModel

    document.documentElement.addEventListener('click', (e) => {
      this.handleClick(e)
    })
  },
  beforeUnmount() {
    document.documentElement.removeEventListener('click', (e) => {
      this.handleClick(e)
    })
  },
  watch: {
    value(): void {
      if (typeof this.value === 'string') {
        this.inputValue = this.value
      }
    },
    inputModel() {
      this.isLoading = true
      this.isOpen = true
      this.$services[this.autocompleteConfig.apiEndpointName as keyof ISuggestionsService]({ count: this.autocompleteConfig.count, query: this.inputModel })
        .then((response) => {
          this.suggestions = response.suggestions ? response.suggestions : []
          this.isLoading = false
        })
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
    select(value: ISuggestion) {
      this.inputValue = value.data[this.autocompleteConfig.subfield]
      this.suggestions = []
      this.isOpen = false
      this.$emit('onSelect', value)
    },
    onEscape() {
      this.isOpen = false
    },
    onBlur() {
      if (this.inputValue !== '' && this.suggestions.length === 1) {
        this.select(this.suggestions[0])
      }
    },
    handleClick(e: MouseEvent) {
      if (!this.$el.contains(e.target) && this.$el !== e.target) {
        this.isOpen = false
      }
    }
  },
  computed: {
    inputDefaultClasses(): Record<string, boolean> {
      return {
        'inputDefault--disabled': this.disabled,
        'inputDefault--error': !!this.errorText || this.isError,
        'inputDefault--headBanner': this.isRound,
        'inputDefault--common': this.isCommon,
        'inputDefault--opened': this.isOpen,
        [this.className]: true,
      }
    }
  }
})
</script>

<style scoped lang='scss'>
@import '~@/components/ui/Input/Input.scss';
@import 'InputAutocomplete.scss';
</style>
