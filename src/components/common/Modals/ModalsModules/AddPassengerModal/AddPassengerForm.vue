<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Добавление пассажира</h2>
    <div class="forms__content">
      <h3 class="forms__sectionTitle">
        Персональная информация
      </h3>
      <Input
        v-model:inputModel="formModel.lastName"
        label="Фамилия"
        :isError="isFieldError(v$.formModel.$errors, 'lastName')"
      />
      <Input
        v-model:inputModel="formModel.firstName"
        label="Имя"
        :isError="isFieldError(v$.formModel.$errors, 'firstName')"
      />
      <Input
        v-model:inputModel="formModel.patronymic"
        label="Отчество"
        :isError="isFieldError(v$.formModel.$errors, 'patronymic')"
      />
      <Switcher
        v-model:switcherModel="formModel.sex"
        :items="sexSelect"
      />
      <Datepicker
        v-model:datePickerModel="formModel.birthday"
        inputLabel="Дата рождения"
        minDate="01.01.1900"
        :maxDate="currDate"
        class="forms__shortInput"
        :isError="isFieldError(v$.formModel.$errors, 'birthday')"
      />
      <Input
        v-model:inputModel="formModel.phone"
        :mask="MaskRegExps.phone"
        label="Телефон"
        class="forms__shortInput"
        :isError="isFieldError(v$.formModel.$errors, 'phone')"
      />
    </div>

    <div class="forms__content">
      <h3 class="forms__sectionTitle">
        Документы
      </h3>
      <Select
        v-model:selectModel="formModel.state"
        :items="stateSelect"
        label="Гражданство"
        :isError="isFieldError(v$.formModel.$errors, 'state')"
      />
      <Select
        v-model:selectModel="formModel.documentType"
        :items="documentTypeSelect"
        label="Тип документа"
        :isError="isFieldError(v$.formModel.$errors, 'documentType')"
      />

      <Input
        v-model:inputModel="formModel.documentNumber"
        label="Серия и номер"
        :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
        class="forms__shortInput"
        :mask="MaskRegExps.birthCertificate"
        v-if="formModel.documentType == 2"
      />
      <Input
        v-model:inputModel="formModel.documentNumber"
        label="Серия и номер"
        :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
        class="forms__shortInput"
        :mask="MaskRegExps.passportRus"
        v-if="formModel.documentType == 3"
      />
      <Input
        v-model:inputModel="formModel.documentNumber"
        label="Серия и номер"
        :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
        class="forms__shortInput"
        :mask="MaskRegExps.foreignPassport"
        v-if="formModel.documentType == 13"
      />
      <Input
        v-model:inputModel="formModel.documentNumber"
        label="Серия и номер"
        :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
        class="forms__shortInput"
        v-if="!formModel.documentType"
      />
      <Checkbox
        v-model:checkboxModel="formModel.isLocal"
        text="Есть прописка в Камчатском крае"
      />
      <template v-if="formModel.isLocal && formModel.state === 'RUS'">
        <p class="forms__common-text_small">
          Загрузите фото пятой страницы паспорта или справки о&nbsp;регистрации, подтверждающей прописку на Камчатке
        </p>
        <input-file :isFluid="true" @onFileInput="(ids) => formModel.imagesIds = ids" />
      </template>
    </div>
    <div class="forms__content">
      <h3 class="forms__sectionTitle">
        Участие в программе лояльности
      </h3>
      <Input
        v-model:inputModel="formModel.bonusCard"
        label="Персональный бонусный счет"
      />
    <p class="forms__common-text_small forms__common-text_no-gutters">
      За полеты мы начислим бонусные баллы. Читайте подробнее, <a class="global_link" href="#">как стать участником</a> программы лояльности.
    </p>
    </div>
    <Button
      kind="Primary"
      :isFluid="true"
      :isDisabled="v$.formModel.$error || getIsLoading"
      @click="handleSubmit"
    >
      Сохранить
    </Button>
  </form>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Input from '@ui/Input/Input.vue'
import Checkbox from '@ui/Checkbox/Checkbox.vue'
import Switcher, { ISwitcherItem } from '@shared/Switcher/Switcher.vue'
import InputFile from '@shared/InputFile/InputFile.vue'
import Select from '@ui/Select/Select.vue'
import Datepicker from '@shared/Datepicker/Datepicker.vue'
import useVuelidate from '@vuelidate/core'
import {
  not,
  sameAs,
  required,
  helpers,
  maxLength,
} from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { formMixin } from '@/mixins/formMixin'
import { IManipulatePassengerForm } from '@/models/forms/passengersForms'
import { ISelectItem } from '@/models/breadcrumbs'
import { FormRegExps, MaskRegExps } from '@/constants/regExps'
import { ICheckBonusData } from '@/models/userAccount/api'
import { ERequestStatus } from '@/models/status'

interface IData {
  formModel: IManipulatePassengerForm,
  sexSelect: ISwitcherItem[],
  stateSelect: ISelectItem[],
  documentTypeSelect: ISelectItem[],
  docTypeValidation: RegExp | null,
  docTypeMask: string | Record<string, unknown>,
  currDate: string,
}

export default defineComponent({
  name: 'AddPassengerForm',
  components: {
    Button,
    Input,
    Checkbox,
    Switcher,
    Select,
    Datepicker,
    InputFile,
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },

  data: (): IData => {
    return {
      formModel: {
        firstName: '',
        lastName: '',
        patronymic: '',
        sex: 0,
        state: '',
        birthday: '',
        phone: '',
        documentType: 3,
        documentNumber: '',
        isLocal: false,
        isUserProfile: false,
        bonusCard: '',
        imagesIds: []
      },
      sexSelect: [
        {
          text: 'Мужчина',
          selected: true,
          type: 0,
        },
        {
          text: 'Женщина',
          type: 1,
        }
      ],
      stateSelect: [],
      documentTypeSelect: [],
      docTypeValidation: null,
      docTypeMask: '',
      currDate: moment().format('DD.MM.YYYY')
    }
  },

  validations() {
    return {
      formModel: {
        lastName: {
          required,
          maxLength: maxLength(50),
        },
        firstName: {
          required,
          maxLength: maxLength(50),
        },
        patronymic: {
          maxLength: maxLength(50),
        },
        birthday: { required },
        state: { required },
        phone: {
          required,
          matchesPhone: helpers.regex(FormRegExps.phone)
        },
        documentType: {
          required,
          notZero: not(sameAs(0))
        },
        documentNumber: {
          regex: (value: string) => {
            if (this.docTypeValidation !== null) {
              return this.docTypeValidation.test(value)
            }
            return false
          }
        },
      },
    }
  },

  methods: {
    handleSubmit(): void {
      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)
        this.v$.$reset()
        this.$services.createPassenger(this.processedFormModal, this.getAuthConfig).then((res) => {
          this.$store.commit('mutOpenedModalName', null)
          this.$store.commit('mutIsLoading', false)

          if (res.status === ERequestStatus.Success) {
            this.$services.getPassengersInfo(this.getAuthConfig).then((passengersRes) => {
              if (passengersRes.status === ERequestStatus.Success) {
                this.$store.commit('mutPassengers', passengersRes.passengers)
              }
              if (passengersRes.status === ERequestStatus.Error) {
                this.$store.commit('mutAlertText', 'Ошибка при обновлении информации о пассажирах')
              }
            })
            this.$store.commit('mutAlertText', 'Пассажир успешно добавлен')
            return
          }

          if (res.status === ERequestStatus.Error) {
            this.$store.commit('mutAlertText', 'Ошибка при добавлении пассажира')
          }
        })
      }
    }
  },

  computed: {
    ...mapGetters(['getStates', 'getDocumentTypes', 'getAuthConfig', 'getUserInfo', 'getIsLoading']),
    processedFormModal(): IManipulatePassengerForm {
      return {
        ...this.formModel,
        isLocal: this.formModel.isLocal ? 1 : 0,
        isUserProfile: this.formModel.isUserProfile ? 1 : 0
      }
    },
    processedBonusCard(): ICheckBonusData {
      return {
        firstName: this.getUserInfo.name,
        lastName: this.getUserInfo.surname,
        patronymic: this.getUserInfo.patronymic,
        birthday: this.getUserInfo.birthday,
        bonusCard: this.getUserInfo.bonus || ''
      }
    },
  },

  watch: {
    formModel: {
      deep: true,
      handler() {
        switch (Number(this.formModel.documentType)) {
          case 2:
            this.docTypeMask = MaskRegExps.birthCertificate
            this.docTypeValidation = FormRegExps.birthCertificate
            break
          case 3:
            this.docTypeMask = MaskRegExps.passportRus
            this.docTypeValidation = FormRegExps.passportRus
            break
          case 13:
            this.docTypeMask = MaskRegExps.foreignPassport
            this.docTypeValidation = FormRegExps.foreignPassport
            break
          default:
            this.docTypeMask = ''
            this.docTypeValidation = null
            break
        }
      }
    },
  },

  created() {
    this.stateSelect = this.getStates(true).map((state: ISelectItem) => {
      return {
        ...state, selected: state.value === 'RUS',
      }
    })
    this.formModel.state = 'RUS'
    this.documentTypeSelect = this.getDocumentTypes(true).map((state: ISelectItem) => {
      return {
        ...state,
        selected: state.value === String(this.formModel.documentType)
      }
    })
    this.formModel.bonusCard = this.getUserInfo.bonus || ''
  }
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
