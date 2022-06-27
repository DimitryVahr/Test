<template>
  <div class="select" :class="selectClasses" data-component='Select'>
    <input
      ref="selectInput"
      type="text"
      placeholder=" "
      class="select__input"
      :class="inputClasses"
      v-model="inputValue"
      :readonly="isReadOnly ? 'readonly': false"
      @click="toggleSelect"
      @input="handleInput"
    />
    <span class="select__placeholder">{{ label }}</span>
    <div class="select__icon"></div>
    <div class="select__items">
      <SelectItem
        v-for="(item, i) in items"
        :key="i"
        :item="item"
        @click="handleItemSelect(i, item)"
        v-show="!item.hidden"
      />
    </div>
    <span v-if="!!this.errorText" class="select__error">{{ errorText }}</span>
  </div>
</template>
<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import SelectItem from '@ui/Select/SelectItem.vue'
import { ISelectItem } from '@/models/breadcrumbs'

interface IData {
  selectedItem: ISelectItem
  isOpened: boolean
  inputValue: string
}

export default defineComponent({
  name: 'Select',
  components: {
    SelectItem,
  },
  emits: ['update:selectModel', 'onSelect', 'onInput'],
  props: {
    /**
     * Блокирует селект
     */
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    /**
     * Предназначен ли инпут только для чтения? (default = true)
     */
    isReadOnly: {
      required: false,
      type: Boolean,
      default: true,
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
     * Массив элементов для селекта
     */
    items: {
      required: true,
      type: Array as PropType<ISelectItem[]>
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
    errorText: {
      required: false,
      type: String as PropType<string>,
      default: '',
    },
    /**
     * Предвыбранный айтем (находится по label)
     */
    preselectedItemLabel: {
      required: false,
      type: String,
      default: ''
    },
    /**
     * Что возвращать у выбранного айтема - label, value или весь объект
     */
    modelReturnType: {
      required: false,
      type: String as PropType<'label' | 'value' | 'full'>,
      default: 'value'
    },
    /**
     * Нужен ли специальный стиль селекту
     */
    type: {
      required: false,
      type: String as PropType<'white'>,
      default: ''
    },
    /**
     * Нужно ли сортировать айтемы при вводе в инпут
     */
    useInputSort: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data(): IData {
    return {
      selectedItem: {} as ISelectItem,
      isOpened: false,
      inputValue: ''
    }
  },
  mounted() {
    this.inputValue = this.items.find((item) => item.selected)?.label || ''
    document.addEventListener('click', (e) => {
      if (e.target !== this.$refs.selectInput) {
        this.isOpened = false
      }
    })
  },
  unmounted() {
    document.removeEventListener('click', (e) => {
      if (e.target !== this.$refs.selectInput) {
        this.isOpened = false
      }
    })
  },
  watch: {
    preselectedItemLabel(): void {
      this.items.forEach((item, i) => {
        if (item.label === this.preselectedItemLabel) {
          this.handleItemSelect(i, item)
        }
      })
    },
    items(newValue: ISelectItem[]): void {
      this.inputValue = this.items.find((item) => item.selected)?.label || ''
      if (this.selectedItem.value) {
        const isSelectedItemStillExist = newValue.some((item) => {
          return item.value === this.selectedItem.value
        })

        if (!isSelectedItemStillExist) {
          this.selectedItem = {} as ISelectItem
          this.inputValue = ''
          this.$emit('onSelect', null)
          this.$emit('update:selectModel', null)
        }
      }
    },
    isOpened(): void {
      this.checkIsInputCorrect()
    }
  },
  methods: {
    toggleSelect(): void {
      this.isOpened = !this.isOpened
    },
    handleItemSelect(itemIndex: number, selectedItem: ISelectItem): void {
      this.items.forEach((item) => {
        item.selected = false
      })
      this.items[itemIndex].selected = true
      this.selectedItem = selectedItem
      this.inputValue = selectedItem.label
      if (this.modelReturnType !== 'full') {
        this.$emit('update:selectModel', selectedItem[this.modelReturnType])
        this.$emit('onSelect', selectedItem[this.modelReturnType])
      } else {
        this.$emit('update:selectModel', selectedItem)
        this.$emit('onSelect', selectedItem)
      }

    },
    checkItemsOnMatch(): void {
      if (!this.isReadOnly && this.useInputSort) {
        this.items.forEach((item) => {
          if (!this.inputValue) {
            item.hidden = false
          } else {
            const isItemMatched = this.$utils.isStringIncluded(item.label, this.inputValue)
            item.hidden = !isItemMatched
          }
        })
      }
    },
    checkIsInputCorrect(): void {
      if (
        !this.isOpened
        && this.isReadOnly === false
        && this.selectedItem.label
      ) {
        if (this.inputValue !== this.selectedItem.label) {
          this.inputValue = this.selectedItem.label
        }
      }
    },
    handleInput(): void {

      this.checkItemsOnMatch()
      this.checkIsInputCorrect()

      if (!this.isReadOnly) {
        this.$emit('onInput', this.inputValue)
      }
    },
  },
  computed: {
    inputClasses(): Record<string, boolean> {
      if (!this.items) {
        return {}
      }
      return {
        'select__input--opened': this.isOpened,
        'select__input--overflow': this.items.length <= 4
      }
    },
    selectClasses() {
      return {
        'select--disabled': this.disabled,
        'select--error': this.isError,
        [`select_${ this.type }`]: this.type
      }
    },
  },
})
</script>

<style scoped lang='scss'>
@import 'Select.scss';
</style>
