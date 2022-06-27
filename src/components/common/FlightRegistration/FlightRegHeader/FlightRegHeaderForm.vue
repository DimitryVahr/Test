<template>
  <form class="flightRegHeader__form">
    <SectionsSelect
      sectionType="from"
      class="flightRegHeader__select"
      v-model:selectModel="formModel.departureCity"
      :disabled="getIsLoading"
    />
    <SectionsSelect
      sectionType="to"
      class="flightRegHeader__select"
      v-model:selectModel="formModel.arrivalCity"
      :disabled="getIsLoading"
      sortMode="available"
      :sortValue="formModel.departureCity"
    />

    <div class="flightRegHeader__datepickers-wrapper">
      <Datepicker
        inputLabel="Туда"
        :isCommon="true"
        class="flightRegHeader__datepicker"
        :excludedDates="disabledDates"
        v-model:datePickerModel="formModel.dateFrom"
        :maxDate="formModel.dateTo"
        :disabled="getIsLoading"
      />
      <Datepicker
        inputLabel="Обратно"
        :isCommon="true"
        class="flightRegHeader__datepicker"
        :excludedDates="disabledDates"
        v-model:datePickerModel="formModel.dateTo"
        :minDate="formModel.dateFrom"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Datepicker from '@shared/Datepicker/Datepicker.vue'
import SectionsSelect from '@shared/SectionsSelect/SectionsSelect.vue'
import { isEmpty, isEqual } from 'lodash'
import { ISmallOrderForm } from '@/models/forms/orderForms'
import { ERequestStatus } from '@/models/status'
import { EFlightRegStages } from '@/models/flightRegistration/regSteps'

interface IData {
  formModel: ISmallOrderForm
  disabledDates: string[]
}

export default defineComponent({
  name: 'FlightRegHeaderForm',
  components: { SectionsSelect, Datepicker },
  data: (): IData => {
    return {
      formModel: {
        departureCity: null,
        arrivalCity: null,
        dateFrom: '',
        dateTo: ''
      },
      disabledDates: [] as string[],
    }
  },

  computed: {
    ...mapGetters([
      'getFlightDisabledDates',
      'getDestinationInfo',
      'getSectionRecord',
      'getAircraftInfo',
      'getPassengerFormSmall',
      'getFlightRegStep',
      'getIsLoading'
    ]),
    computedFormModel(): ISmallOrderForm {
      return { ...this.formModel }
    }
  },

  watch: {
    computedFormModel: {
      deep: true,
      handler(newValue, oldValue) {
        if (oldValue.departureCity !== null && newValue.departureCity !== oldValue.departureCity) {
          this.formModel.arrivalCity = null
        }
        // Удалять выбранные даты при смене городов
        if (
          (newValue.departureCity !== oldValue.departureCity
            || newValue.arrivalCity !== oldValue.arrivalCity)
          && !isEqual(newValue, this.getPassengerFormSmall)
        ) {
          this.formModel.dateFrom = ''
          this.formModel.dateTo = ''
        }
        this.$store.commit('mutPassengerFormSmall', newValue)

        // Возвращать на стадию тарифов
        if (this.getFlightRegStep !== EFlightRegStages.Tariffs) {
          this.$store.commit('mutFlightRegStep', EFlightRegStages.Tariffs)
        }

        // Если в форме заполнены Вылет, Прилет и Туда
        if (
          this.formModel.departureCity
          && this.formModel.arrivalCity
          && this.formModel.dateFrom
          && this.getDestinationInfo.placeFrom
          && this.getDestinationInfo.placeTo
        ) {
          if (
            !isEqual(
              { ...newValue, dateTo: '' },
              { ...oldValue, dateTo: '' }
            )
            && (isEmpty(this.getAircraftInfo)
              || !isEqual(this.getAircraftInfo, newValue))
          ) {
            this.$store.commit('mutAircraftInfo', {})
            this.$store.commit('mutIsLoading', true)
            this.$services
              .getAircraftInfo({
                date: this.formModel.dateFrom,
                waypoints: [
                  this.getSectionRecord.fromId,
                  this.getSectionRecord.toId
                ]
              })
              .then((res) => {
                this.$store.commit('mutIsLoading', false)
                if (res.status === ERequestStatus.Success) {
                  this.$store.commit('mutAircraftInfo', res.data)
                  return
                }
                if (res.status === ERequestStatus.Error) {
                  this.$store.commit(
                    'mutAlertText',
                    'Ошибка при получении информации о свободных местах'
                  )
                }
              })
          }
        } else {
          this.$store.commit('mutAircraftInfo', {})
        }
      }
    },
    getFlightDisabledDates(newValue: string[], oldValue: string[]): void {
      if (!isEqual(newValue, oldValue)) {
        this.disabledDates = newValue
      }
    }
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
@import 'FlightRegHeader';
</style>
