<template>
  <DatePicker
    v-model="model"
    :attributes="attrs"
    :modelConfig="modelConfig"
    :masks="masks"
    :minDate="minDateVal"
    :maxDate="maxDateVal"
    :popover="popover"
    :disabled-dates="disabledDates"
    locale="ru-RU"
    ref="datepicker"
    class="datepicker__wrapper vc-changer"
    data-component="Datepicker"
  >
    <template v-slot="{ inputValue, togglePopover }">
      <Input
        :readonly="true"
        :label="inputLabel"
        :value="inputValue"
        @click="!disabled && togglePopover()"
        :isCommon="isCommon"
        :mask="MaskRegExps.date"
        :errorText="errorText"
        :isError="isError"
        :disabled="disabled"
      >
        <template v-slot:child-btn>
          <Button
            kind="Unstyled"
            className="datepicker__calendar-btn"
          >
            <Icon height="22" width="20" :name="EIconNames.Calendar"/>
          </Button>
        </template>
      </Input>
    </template>
  </DatePicker>
</template>

<script lang='ts'>
import { defineComponent, PropType, Ref } from 'vue'
import { DatePicker } from 'v-calendar'
import Input from '@ui/Input/Input.vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { add, parse } from 'date-fns'

export default defineComponent({
  name: 'Datepicker',
  components: {
    Icon,
    Button,
    Input,
    DatePicker,
  },
  emits: ['update:datePickerModel'],
  props: {
    /**
     * Обычный (белый) инпут для датапикера
     */
    isCommon: {
      required: false,
      type: Boolean,
      default: false
    },
    /**
     * Placeholder инпута
     */
    inputLabel: {
      required: false,
      type: String,
      default: ''
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
     * Текст ошибки инпута
     */
    errorText: {
      required: false,
      type: String,
      default: ''
    },
    /**
     * Контролирующая модель датапикера (для задания значений из вне через v-model)
     */
    datePickerModel: {
      required: false,
      type: String,
      default: ''
    },
    /**
     * Минимально - доступная дата для выбора
     */
    minDate: {
      required: false,
      type: String,
      default: ''
    },
    /**
     * Максимально - доступная дата для выбора
     */
    maxDate: {
      required: false,
      type: String,
      default: ''
    },
    excludedDates: {
      required: false,
      type: Array as PropType<string[]>,
      default: () => []
    },
    /**
     * Неактивное состояние
     */
    disabled: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      calendarRef: {} as Ref,
      model: '',
      minDateVal: new Date(),
      maxDateVal: add(new Date(), { months: 3 }),
      disabledDates: [] as Date[],
      attrs: [
        {
          key: 'today',
          highlight: {
            class: 'datepicker_today',
            contentClass: 'datepicker_today-content',
          },
          dates: new Date(),
        },
        {
          key: 'weekends',
          highlight: {
            contentClass: 'datepicker_weekend',
          },
          dates: {
            weekdays: [1, 7]
          },
        },
      ],
      modelConfig: {
        type: 'string',
        mask: 'DD.MM.YYYY',
      },
      masks: {
        title: 'MMMM YYYY',
        input: 'DD.MM.YYYY',
      },
      popover: {
        hideDelay: 0,
        transition: 'none'
      }
    }
  },
  mounted() {
    this.model = this.datePickerModel
    this.setMinDate()
    this.setMaxDate()
    this.setDisabledDates()
  },
  watch: {
    datePickerModel() {
      this.model = this.datePickerModel
    },
    model() {
      this.$emit('update:datePickerModel', this.model)
    },
    minDate() {
      this.setMinDate()
    },
    maxDate() {
      this.setMaxDate()
    },
    excludedDates() {
      this.setDisabledDates()
      this.model = ''
    }
  },
  methods: {
    setMinDate(): void {
      if (!this.minDate?.length) {
        this.minDateVal = new Date()
      } else {
        this.minDateVal = parse(this.minDate, 'dd.MM.yyyy', new Date())
      }
    },
    setMaxDate(): void {
      if (!this.maxDate?.length) {
        this.maxDateVal = add(new Date(), { months: 3 })
      } else {
        this.maxDateVal = parse(this.maxDate, 'dd.MM.yyyy', new Date())
      }
    },
    setDisabledDates(): void {
      this.disabledDates = this.excludedDates.map((date: string) => {
        return parse(date, 'dd.MM.yyyy', new Date())
      })
    },
  }
})
</script>

<style lang='scss'>
@import 'Datepicker';
</style>
