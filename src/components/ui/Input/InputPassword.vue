<template>
  <div data-component="InputPassword">
    <div class="inputPassword" :class="inputPasswordClasses">
      <input :autocomplete="autocomplete" class="inputPassword__input" :type="inputType" v-model="inputValue" placeholder=" " />
      <span class="inputPassword__placeholder">{{label}}</span>
      <slot name="child-btn">
        <div
          @click="showPassword" class="buttonShow">
          <Icon :width="24" :height="24" :name="!toggleInputType ? EIconNames.EyeClosed : EIconNames.Eye"/>
        </div>
      </slot>
    </div>
    <span v-if="!!errorText" class="errorDescription">{{errorText}}</span>
    <span v-if="!errorText && !!passwordHint" class="passwordHint">{{passwordHint}}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

interface IData {
  inputType: string
  toggleInputType: boolean
  inputValue: string
}

export default defineComponent({
  name: 'InputPassword',
  emits: ['update:inputModel', 'onChange'],
  components: {
    Icon,
  },
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
     * Error-Description
     */
    errorText: {
      required: false,
      type: String
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
     * Подсказака пароля
     */
    passwordHint: {
      required: false,
      type: String
    },
    /**
     * аттрибут autocomplete (https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
     */
    autocomplete: {
      required: false,
      type: String,
      default: 'on'
    }
  },
  data(): IData {
    return {
      inputType: 'password',
      toggleInputType: false,
      inputValue: '',
    }
  },
  methods: {
    showPassword() {
      this.toggleInputType = !this.toggleInputType
      this.inputType = this.toggleInputType ? 'text' : 'password'
    },
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
      this.$emit('onChange', this.inputValue)
    },
  },
  computed: {
    inputPasswordClasses(): Record<string, boolean> {
      return {
        'inputPassword--disabled': this.disabled,
        'inputPassword--error': !!this.errorText,
        'inputPassword--headBanner': this.isRound,
        [this.className]: true,
      }
    }
  },
  mounted() {
    this.inputValue = this.inputModel
  },
})
</script>

<style scoped lang='scss'>
@import 'InputPassword.scss';
</style>
