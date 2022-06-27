<template>
  <form class="flightFormsSmall__form" @submit.prevent="handleModalOpen(EModalsNames.HelicopterOrderModal)">
    <Input
      class="flightFormsSmall__input"
      v-model:inputModel="formModel.departureCity"
      label="Вылет"
      :isCommon="true"
      :isError="isFieldError(v$.formModel.$errors, 'departureCity')"
    />
    <Input
      class="flightFormsSmall__input"
      v-model:inputModel="formModel.arrivalCity"
      label="Прилёт"
      :isCommon="true"
    />

    <div class="flightFormsSmall__datepickers-wrapper">
      <Datepicker
        v-model:datePickerModel="formModel.dateFrom"
        inputLabel="Туда"
        :isCommon="true"
        class="flightFormsSmall__datepicker"
        :isError="isFieldError(v$.formModel.$errors, 'dateFrom')"
        :maxDate="formModel.dateTo"
      />
      <Datepicker
        v-model:datePickerModel="formModel.dateTo"
        inputLabel="Обратно"
        :isCommon="true"
        class="flightFormsSmall__datepicker"
        :minDate="formModel.dateFrom"
      />
    </div>

    <Button
      kind="Primary"
      class="flightFormsSmall__submit-btn"
    >
      Заказать вертолет
    </Button>
  </form>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Datepicker from '@shared/Datepicker/Datepicker.vue'
import Button from '@ui/Button/Button.vue'
import Input from '@ui/Input/Input.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { EModalsNames } from '@/models/modals'
import { formMixin } from '@/mixins/formMixin'
import { ISmallOrderFormHelicopter } from '@/models/forms/orderForms'

interface IData {
  formModel: ISmallOrderFormHelicopter
}

export default defineComponent({
  name: 'HelicopterOrderSmallForm',
  components: {
    Button,
    Datepicker,
    Input
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },
  data: (): IData => {
    return {
      formModel: {
        departureCity: '',
        arrivalCity: '',
        dateFrom: '',
        dateTo: ''
      },
    }
  },
  validations() {
    return {
      formModel: {
        departureCity: { required },
        dateFrom: { required },
      },
    }
  },
  methods: {
    handleModalOpen(modalNameToOpen: EModalsNames): void {
      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutHelicopterFormSmall', this.formModel)
        this.$store.commit('mutOpenedModalName', modalNameToOpen)
        this.formModel = {} as ISmallOrderFormHelicopter
        this.v$.$reset()
      }
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'FlightFormsSmall';
</style>
