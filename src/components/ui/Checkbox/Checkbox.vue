<template>
  <div class="checkboxWrap" data-component="Checkbox"  @click="!disabled?toggleClassCheckbox():undefined" :class="checkboxClasses">
    <div class="checkbox">
      <Icon :width="12" :height="9" class="checkboxMarker" :name="EIconNames.CheckboxMarker"/>
    </div>
    <span class="checkboxText">{{ text }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  name: 'Checkbox',
  props: {
    /**
     * Значение чекбокса задаваемое разаботчиком
     */
    value: {
      required: false,
      type: Boolean,
    },
    /**
     * Контролирующая модель чекбокса (для задания значений из вне через v-model)
     */
    checkboxModel: {
      required: false,
      type: Boolean,
      default: false,
    },
    /**
     * Блокирует чекбокс
     */
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    /**
     * Текст чекбокса
     */
    text: {
      required: false,
      type: String,
    }
  },

  computed: {
    checkboxClasses(): Record<string, boolean> {
      return {
        'checkboxWrap--checked': this.checkboxValue,
        'checkboxWrap--disabled': this.disabled,
      }
    }
  },

  components: {
    Icon,
  },
  data() {
    return {
      checkboxValue: false
    }
  },
  methods: {
    toggleClassCheckbox() {
      this.checkboxValue = !this.checkboxValue
    }
  },
  mounted() {
    this.checkboxValue = this.checkboxModel
  },
  watch: {
    value(): void {
      if (typeof this.value === 'boolean') {
        this.checkboxValue = this.value
      }
    },
    checkboxModel() {
      this.checkboxValue = this.checkboxModel
    },
    checkboxValue() {
      this.$emit('update:checkboxModel', this.checkboxValue)
    },
  },
})
</script>

<style scoped lang='scss'>
@import 'Checkbox.scss';
</style>
