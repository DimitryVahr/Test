<template>
  <form class="flightFormsSmall__form" @submit.prevent="handleSubmit">
    <SectionsSelect
      v-model:selectModel="formModel.departureCity"
      sectionType="from"
      class="flightFormsSmall__select"
      :isError="isFieldError(v$.formModel.$errors, 'departureCity')"
    />
    <SectionsSelect
      v-model:selectModel="formModel.arrivalCity"
      sectionType="to"
      class="flightFormsSmall__select"
      sortMode="available"
      :isError="isFieldError(v$.formModel.$errors, 'arrivalCity')"
      :sortValue="formModel.departureCity"
    />

    <div class="flightFormsSmall__datepickers-wrapper">
      <Datepicker
        v-model:datePickerModel="formModel.dateFrom"
        inputLabel="Туда"
        :isCommon="true"
        class="flightFormsSmall__datepicker"
        :isError="isFieldError(v$.formModel.$errors, 'dateFrom')"
        :maxDate="formModel.dateTo"
        :excludedDates="disabledDates"
      />
      <Datepicker
        v-model:datePickerModel="formModel.dateTo"
        inputLabel="Обратно"
        :isCommon="true"
        class="flightFormsSmall__datepicker"
        :minDate="formModel.dateFrom"
        :excludedDates="disabledDates"
      />
    </div>

    <Button kind="Primary" class="flightFormsSmall__submit-btn">
      Записаться на рейс
    </Button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isEmpty, isEqual } from 'lodash'
import Datepicker from '@shared/Datepicker/Datepicker.vue'
import Button from '@ui/Button/Button.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import SectionsSelect from '@shared/SectionsSelect/SectionsSelect.vue'
import { mapGetters } from 'vuex'
import { formMixin } from '@/mixins/formMixin'
import { ISmallOrderForm } from '@/models/forms/orderForms'

interface IData {
  formModel: ISmallOrderForm
  disabledDates: string[]
}

export default defineComponent({
  name: 'HelicopterOrderSmallForm',
  components: {
    SectionsSelect,
    Button,
    Datepicker
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },
  data: (): IData => {
    return {
      formModel: {
        departureCity: null,
        arrivalCity: null,
        dateFrom: '',
        dateTo: ''
      },
      disabledDates: []
    }
  },
  validations() {
    return {
      formModel: {
        departureCity: { required },
        arrivalCity: { required },
        dateFrom: { required }
      }
    }
  },
  methods: {
    handleSubmit(): void {
      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutPassengerFormSmall', this.formModel)
        // this.formModel = {} as ISmallOrderForm
        this.v$.$reset()
        this.$router.push('/flight-registration')
      }
    }
  },

  computed: {
    ...mapGetters(['getFlightDisabledDates', 'getPassengerFormSmall']),
    computedFormModel(): ISmallOrderForm {
      return { ...this.formModel }
    }
  },

  watch: {
    getFlightDisabledDates(newValue: string[], oldValue: string[]): void {
      if (!isEqual(newValue, oldValue)) {
        this.disabledDates = newValue
      }
    },

    computedFormModel(newValue, oldValue) {
      if (oldValue.departureCity !== null && newValue.departureCity !== oldValue.departureCity) {
        this.formModel.arrivalCity = null
      }

      if (
        !isEmpty(newValue)
        && newValue.departureCity
        && newValue.arrivalCity
        && newValue.dateFrom
      ) {
        this.$store.commit('mutPassengerFormSmall', newValue)
      } else {
        this.$store.commit('mutPassengerFormSmall', {})
      }
    },
  },

  mounted() {
    if (!isEmpty(this.getFlightDisabledDates)) {
      this.disabledDates = this.getFlightDisabledDates
    }

    this.$nextTick(() => {
      if (!isEmpty(this.getPassengerFormSmall)) {
        this.formModel = this.getPassengerFormSmall
      }
    })
  }
})
</script>

<style scoped lang="scss">
@import 'FlightFormsSmall';
</style>
