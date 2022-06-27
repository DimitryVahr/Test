<template>
  <div class="flightRegItem" :id="formId">
    <h2 class="h2 flightRegItem__title">{{ formTitle }}</h2>
    <div
      class="flightRegItem__block flightRegItem__block_passenger"
      v-if="passengersSelect && passengersSelect.length"
    >
      <Select
        label="Пассажир"
        :items="filteredPassengersSelect"
        :isError="isFieldError(v$.formModel.$errors, 'id')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'id')"
        v-model:selectModel="formModel.id"
      />
    </div>
    <template v-if="isFieldsShown">
      <div class="flightRegItem__block">
        <h3 class="h3 flightRegItem__subtitle">Персональная информация</h3>
        <Input
          label="Фамилия"
          v-model:inputModel="formModel.lastName"
          :isError="isFieldError(v$.formModel.$errors, 'lastName')"
          :errorText="getFieldErrorMsg(v$.formModel.$errors, 'lastName')"
          :disabled="formModel.id > 0"
        />
        <Input
          label="Имя"
          v-model:inputModel="formModel.firstName"
          :isError="isFieldError(v$.formModel.$errors, 'firstName')"
          :errorText="getFieldErrorMsg(v$.formModel.$errors, 'firstName')"
          :disabled="formModel.id > 0"
        />
        <Input
          label="Отчество"
          v-model:inputModel="formModel.patronymic"
          :isError="isFieldError(v$.formModel.$errors, 'patronymic')"
          :errorText="getFieldErrorMsg(v$.formModel.$errors, 'patronymic')"
          :disabled="formModel.id > 0"
        />
        <Switcher
          :items="sexSelect"
          v-model:switcherModel="formModel.sex"
          :disabled="formModel.id > 0"
        />
        <div class="flightRegItem__grid_two">
          <Datepicker
            inputLabel="Дата рождения"
            v-model:datePickerModel="formModel.birthday"
            :isError="isFieldError(v$.formModel.$errors, 'birthday')"
            :errorText="getFieldErrorMsg(v$.formModel.$errors, 'birthday')"
            :minDate="minBirthday"
            :maxDate="currDate"
            :disabled="formModel.id > 0"
          />
        </div>
        <div
          v-if="
            passengerType === 'adult' ||
              passengerType === 'adultLocal' ||
              passengerType === 'adultForeign'
          "
          class="flightRegItem__grid_two"
        >
          <Input
            label="Телефон"
            v-model:inputModel="formModel.phone"
            :mask="MaskRegExps.phone"
            :isError="isFieldError(v$.formModel.$errors, 'phone')"
            :errorText="getFieldErrorMsg(v$.formModel.$errors, 'phone')"
            :disabled="formModel.id > 0"
          />
        </div>
      </div>
      <div class="flightRegItem__block">
        <h3 class="h3 flightRegItem__subtitle">Документы</h3>
        <Select
          label="Гражданство"
          :items="stateSelect"
          v-model:selectModel="formModel.state"
          :disabled="formModel.id > 0"
        />
        <Select
          label="Тип документа"
          :items="documentTypeSelect"
          v-model:selectModel="formModel.documentType"
          :disabled="formModel.id > 0"
        />
        <div class="flightRegItem__grid_two">
          <Input
            label="Номер"
            v-model:inputModel="formModel.documentNumber"
            :mask="MaskRegExps.birthCertificate"
            :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
            :errorText="
              getFieldErrorMsg(v$.formModel.$errors, 'documentNumber')
            "
            v-if="+formModel.documentType === 2"
            :disabled="formModel.id > 0"
          />
          <Input
            label="Серия и номер"
            v-model:inputModel="formModel.documentNumber"
            :mask="MaskRegExps.passportRus"
            :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
            :errorText="
              getFieldErrorMsg(v$.formModel.$errors, 'documentNumber')
            "
            v-if="+formModel.documentType === 3"
            :disabled="formModel.id > 0"
          />
          <Input
            label="Серия и номер"
            v-model:inputModel="formModel.documentNumber"
            :mask="MaskRegExps.foreignPassport"
            :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
            :errorText="
              getFieldErrorMsg(v$.formModel.$errors, 'documentNumber')
            "
            v-if="+formModel.documentType === 13"
            :disabled="formModel.id > 0"
          />
          <Input
            label="Серия и номер"
            v-model:inputModel="formModel.documentNumber"
            :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
            :errorText="
              getFieldErrorMsg(v$.formModel.$errors, 'documentNumber')
            "
            v-if="!formModel.documentType"
            :disabled="formModel.id > 0"
          />
        </div>
        <div
          class="flightRegItem__checkbox"
          v-if="passengerType === 'adultLocal'"
        >
          <Checkbox
            :value="true"
            :disabled="true"
            text="Есть прописка в Камчатском крае"
          />
          <template
            v-if="
              formModel.id <= 0 &&
                formModel.isLocal &&
                formModel.state === 'RUS'
            "
          >
            <p class="flightRegItem__text">
              Загрузите фото пятой страницы паспорта или справки
              о&nbsp;регистрации, подтверждающей прописку на Камчатке
            </p>
            <InputFile
              :isFluid="true"
              @onFileInput="(ids) => (formModel.imagesIds = ids)"
            />
          </template>
          <Button
            class="flightRegItem__documents"
            v-if="formModel.id > 0"
            kind="Link"
            type="button"
            >Сканы документов</Button
          >
        </div>
      </div>
      <div class="flightRegItem__block">
        <h3 class="h3 flightRegItem__subtitle">
          Участие в программе лояльности
        </h3>
        <Input
          label="Персональный бонусный счет"
          v-model:inputModel="formModel.bonusCard"
          :disabled="formModel.id > 0"
        />
        <p class="flightRegItem__text">
          За полеты мы начислим бонусные баллы. Читайте подробнее,
          <a class="global_link" href="#">как стать участником</a> программы
          лояльности.
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapGetters } from 'vuex'
import { clone } from 'lodash'
import {
  helpers, maxLength, required, requiredIf
} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import Input from '@ui/Input/Input.vue'
import Checkbox from '@ui/Checkbox/Checkbox.vue'
import InputFile from '@shared/InputFile/InputFile.vue'
import Switcher, { ISwitcherItem } from '@shared/Switcher/Switcher.vue'
import Datepicker from '@shared/Datepicker/Datepicker.vue'
import Select from '@ui/Select/Select.vue'
import Button from '@ui/Button/Button.vue'
import moment from 'moment'
import { ISelectItem } from '@/models/breadcrumbs'
import { IFlightRegPassenger } from '../types'
import { IPassengerInfo } from '@/models/userAccount/api'
import { formMixin } from '@/mixins/formMixin'
import { TFlightRegPassenger } from '@/models/flightRegistration/flightReg'

interface ISelectedPassengersIds {
  index: number
  ids: number[]
}

interface IData {
  formValue: null | IFlightRegPassenger
  formFallback: null | IFlightRegPassenger
  formFallbackId: number
  stateSelect: ISelectItem[]
  sexSelect: ISwitcherItem[]
  documentTypeSelect: ISelectItem[]
  passengersSelect: ISelectItem[]
  selectedPassengerId: null | number
  minBirthday: string
  currDate: string
  filteredPassengersSelect: ISelectItem[]
}

export default defineComponent({
  name: 'FlightRegItemPassenger',
  emits: ['update:formModel'],
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate() }
  },
  components: {
    Input,
    Switcher,
    Datepicker,
    Select,
    Checkbox,
    InputFile,
    Button
  },
  props: {
    /**
     * Тип пассажира
     */
    passengerType: {
      required: true,
      type: String as PropType<TFlightRegPassenger>
    },
    /**
     * Объект v-model
     */
    formModel: {
      required: true,
      type: Object as PropType<IFlightRegPassenger>
    },
    /**
     * id формы
     */
    formId: {
      required: true,
      type: String as PropType<string>
    },
    /**
     * индекс формы и массив id выбранных пассажиров
     */
    selectedPassengersIds: {
      required: true,
      type: Object as PropType<ISelectedPassengersIds>
    }
  },

  data(): IData {
    return {
      formValue: null,
      formFallback: null,
      sexSelect: [
        {
          text: 'Мужчина',
          selected: true,
          type: 0
        },
        {
          text: 'Женщина',
          type: 1
        }
      ],
      stateSelect: [],
      documentTypeSelect: [],
      passengersSelect: [],
      selectedPassengerId: null,
      minBirthday: `01.01.${new Date().getFullYear() - 100}`,
      currDate: moment().format('DD.MM.YYYY'),
      formFallbackId: 0,
      filteredPassengersSelect: []
    }
  },

  validations() {
    return {
      formModel: {
        id: {
          required: helpers.withMessage(
            this.ErrorMessages.required,
            requiredIf(
              !!(this.passengersSelect && this.passengersSelect.length)
            )
          )
        },
        lastName: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          maxLength: helpers.withMessage(
            this.ErrorMessages.tooLong,
            maxLength(50)
          )
        },
        firstName: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          maxLength: helpers.withMessage(
            this.ErrorMessages.tooLong,
            maxLength(50)
          )
        },
        patronymic: {
          maxLength: helpers.withMessage(
            this.ErrorMessages.tooLong,
            maxLength(50)
          )
        },
        birthday: {
          required: helpers.withMessage(this.ErrorMessages.required, required)
        },
        documentNumber: {
          required: helpers.withMessage(this.ErrorMessages.required, required)
        },
        phone: {
          phoneFormat: helpers.withMessage(
            this.ErrorMessages.phoneLength,
            helpers.regex(this.FormRegExps.phone)
          )
        }
      }
    }
  },

  watch: {
    formModel() {
      this.formValue = this.formModel
    },
    formValue() {
      this.$emit('update:formModel', this.formValue)
    },

    selectedPassengersIds(newValue) {
      const result: number[] = []
      // Получаем отличающиеся id
      newValue.ids.forEach((id: number, i: number) => {
        if (newValue.index !== i && id !== null) {
          result.push(id)
        }
      })
      this.filteredPassengersSelect = this.passengersSelect.filter((passenger) => {
        if (passenger.value !== undefined && typeof passenger.value === 'number') {
          return !result.includes(passenger.value)
        }
        return false
      })
    },

    computedFormModel: {
      deep: true,
      handler(newValue, oldValue) {
        // Смена статуса на успешный если все обязательные поля заполнены
        if (!this.v$.$invalid) {
          this.$store.commit('mutFlightRegFormStatus', {
            formId: this.formId,
            formType: this.passengerType,
            status: 'Success'
          })
        } else {
          this.$store.commit('mutFlightRegFormStatus', {
            formId: this.formId,
            formType: this.passengerType,
            status: 'Normal'
          })
        }

        const selectedPassenger = this.getPassengers.find(
          (passenger: IPassengerInfo) => passenger.id === this.formValue?.id
        )
        if (
          selectedPassenger
          && this.formValue
          && newValue.id !== oldValue.id
        ) {
          this.formValue = {
            ...this.formValue,
            birthday: selectedPassenger.birthday,
            bonusCard: selectedPassenger.bonusCard || '',
            documentNumber: selectedPassenger.documentNumber,
            documentType: +selectedPassenger.documentType,
            firstName: selectedPassenger.firstName,
            lastName: selectedPassenger.lastName,
            patronymic: selectedPassenger.patronymic,
            imagesIds: selectedPassenger.images?.length
              ? [...selectedPassenger.imagesIds]
              : [],
            isLocal: selectedPassenger.isLocal,
            phone: this.$utils.formatPhone(selectedPassenger.phone, true),
            sex: selectedPassenger.sex,
            state: selectedPassenger.state,
            type: selectedPassenger.type
          }

          this.stateSelect = this.stateSelect.map((state: ISelectItem) => {
            return {
              ...state,
              selected: state.value === this.formValue?.state
            }
          })
          this.documentTypeSelect = this.documentTypeSelect.map(
            (state: ISelectItem) => {
              return {
                ...state,
                selected: Number(state.value) === this.formValue?.documentType
              }
            }
          )
        }

        // При выборе Нового пассажира выполнить reset формы
        if (this.formValue && this.formValue.id <= 0) {
          this.formValue = this.formFallback
          if (this.formFallback) this.formFallback.id = this.formFallbackId
          // this.stateSelect = this.getStates(true).map((state: ISelectItem) => {
          //   return {
          //     ...state,
          //     selected: state.value === this.formFallback?.state
          //   }
          // })
          // this.documentTypeSelect = this.getDocumentTypes(true).map(
          //   (state: ISelectItem) => {
          //     return {
          //       ...state,
          //       selected:
          //         Number(state.value) === this.formFallback?.documentType
          //     }
          //   }
          // )
        }
      }
    },
    v$() {
      if (this.v$.$error) {
        this.$store.commit('mutFlightRegFormStatus', {
          formId: this.formId,
          formType: this.passengerType,
          status: 'Error',
          errorText: 'Заполните данные пассажира'
        })
      }
    }
  },

  computed: {
    ...mapGetters(['getStates', 'getDocumentTypes', 'getPassengers']),
    formTitle(): string {
      switch (this.passengerType) {
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
        default:
          return 'Взрослый'
      }
    },

    computedFormModel(): IFlightRegPassenger {
      return { ...this.formModel }
    },

    isFieldsShown(): boolean {
      return (
        !this.passengersSelect.length
        || this.passengersSelect.some((passenger) => passenger.selected)
      )
    }
  },

  mounted() {
    this.formValue = this.formModel
    this.formFallback = clone(this.formValue)
    this.formFallbackId = this.formFallback.id
    this.stateSelect = this.getStates(true).map((state: ISelectItem) => {
      return {
        ...state,
        selected: state.value === this.formModel.state
      }
    })
    this.documentTypeSelect = this.getDocumentTypes(true).map(
      (state: ISelectItem) => {
        return {
          ...state,
          selected: Number(state.value) === this.formModel.documentType
        }
      }
    )
    this.passengersSelect = this.getPassengers
      .filter((passenger: IPassengerInfo) => {
        return passenger.type === this.passengerType
      })
      .map((passenger: IPassengerInfo) => {
        return {
          label: `${passenger.lastName} ${passenger.firstName} ${passenger.patronymic}`,
          value: passenger.id
        }
      })
    if (this.getPassengers && this.getPassengers.length) {
      this.passengersSelect.push({
        label: 'Новый пассажир',
        value: this.formFallback.id
      })
    }
  }
})
</script>

<style scoped lang="scss">
@import 'FlightRegForm';
</style>
