<template>
  <div class="fillingForm">
    <span class="fillingForm__title">Заполнение формы</span>
    <FillingFormItem
      v-for="(item, i) in getFlightRegFormsStatuses"
      :key="item.formId + i"
      :text="formTypeToText(item.formType)"
      :error="item.status === 'Error'"
      :success="item.status === 'Success'"
      :href="item.formId"
      :tip="item.errorText"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import FillingFormItem from '@common/FlightRegistration/FlightRegTabs/FlightRegPassengers/FillingForm/FillingFormItem/FillingFormItem.vue'
import { TFlightRegFormType } from '@/models/flightRegistration/flightReg'

export default defineComponent({
  name: 'FillingForm',
  components: {
    FillingFormItem
  },
  methods: {
    formTypeToText(formType: TFlightRegFormType): string {
      switch (formType) {
        case 'adult':
          return 'Взрослый'
        case 'adultLocal':
          return 'Взрослый с\u00A0пропиской в\u00A0Камчатском крае'
        case 'child':
          return 'Ребенок 2–12 лет гражданин РФ'
        case 'childForeign':
          return 'Ребенок 2–12 лет гражданин иностранного государства'
        case 'infant':
          return 'Ребенок до 2 лет без места'
        case 'adultForeign':
          return 'Взрослый гражданин иностранного государства'
        case 'Bonus':
          return 'Оплата своего билета бонусами'
        case 'Contact':
          return 'Контактное лицо'
        default:
          return 'Взрослый'
      }
    }
  },

  computed: {
    ...mapGetters(['getFlightRegFormsStatuses'])
  },
})
</script>

<style scoped lang="scss">
@import 'FillingForm';
</style>
