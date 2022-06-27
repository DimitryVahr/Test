<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Профиль</h2>
    <div class="forms__content">
      <h3 class="forms__sectionTitle">
        Персональная информация
      </h3>

      <Input
        v-model:inputModel="formModel.surname"
        label="Фамилия"
        :isError="isFieldError(v$.formModel.$errors, 'surname')"
      />
      <Input
        v-model:inputModel="formModel.name"
        label="Имя"
        :isError="isFieldError(v$.formModel.$errors, 'name')"
      />
      <Input
        v-model:inputModel="formModel.patronymic"
        label="Отчество"
        :isError="isFieldError(v$.formModel.$errors, 'patronymic')"
      />

      <Switcher v-model:switcherModel="formModel.sex" :items="sexSelect" />

      <Datepicker
        v-model:datePickerModel="formModel.birthday"
        inputLabel="Дата рождения"
        minDate="01.01.1900"
        class="forms__shortInput"
        :isError="isFieldError(v$.formModel.$errors, 'birthday')"
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
        v-if="formModel.documentType === '2'"
      />
      <Input
        v-model:inputModel="formModel.documentNumber"
        label="Серия и номер"
        :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
        class="forms__shortInput"
        :mask="MaskRegExps.passportRus"
        v-if="formModel.documentType === '3'"
      />
      <Input
        v-model:inputModel="formModel.documentNumber"
        label="Серия и номер"
        :isError="isFieldError(v$.formModel.$errors, 'documentNumber')"
        class="forms__shortInput"
        :mask="MaskRegExps.foreignPassport"
        v-if="formModel.documentType === '13'"
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
          Загрузите фото страницы паспорта или справки о&nbsp;действующей
          регистрации, подтверждающей прописку на Камчатке
        </p>
        <InputFile
          :isFluid="true"
          @onFileInput="(ids) => (formModel.imagesIds = ids)"
        />
      </template>
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

<script lang="ts">
import { defineComponent } from 'vue'
import { isEmpty } from 'lodash'
import useVuelidate from '@vuelidate/core'
import Input from '@ui/Input/Input.vue'
import Switcher, { ISwitcherItem } from '@shared/Switcher/Switcher.vue'
import Datepicker from '@shared/Datepicker/Datepicker.vue'
import Select from '@ui/Select/Select.vue'
import Checkbox from '@ui/Checkbox/Checkbox.vue'
import Button from '@ui/Button/Button.vue'
import InputFile from '@shared/InputFile/InputFile.vue'
import { maxLength, required } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import { formMixin } from '@/mixins/formMixin'
import { IUserProfileUpdateForm } from '@/models/forms/userForms'
import { ISelectItem } from '@/models/breadcrumbs'
import { FormRegExps, MaskRegExps } from '@/constants/regExps'

interface IData {
  formModel: IUserProfileUpdateForm
  sexSelect: ISwitcherItem[]
  stateSelect: ISelectItem[]
  documentTypeSelect: ISelectItem[]
  docTypeValidation: RegExp | null
  docTypeMask: string | Record<string, unknown>
}

export default defineComponent({
  name: 'ProfileEditForm',
  emits: ['onProfileEditSuccess'],
  components: {
    Button,
    Checkbox,
    Select,
    Datepicker,
    Switcher,
    Input,
    InputFile
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: false, $autoDirty: true }) }
  },

  computed: {
    ...mapGetters([
      'getStates',
      'getDocumentTypes',
      'getAuthKey',
      'getUserInfo',
      'getIsLoading'
    ]),

    processedFormModel(): IUserProfileUpdateForm {
      return {
        ...this.formModel,
        isLocal: this.formModel.isLocal ? 1 : 0
      }
    }
  },

  data: (): IData => {
    return {
      formModel: {
        surname: '',
        name: '',
        patronymic: '',
        email: '',
        imagesIds: [],
        phone: '',
        sex: 0,
        birthday: '',
        state: '',
        documentType: '',
        documentNumber: '',
        isLocal: false,
        title: null
      },
      sexSelect: [
        {
          text: 'Мужчина',
          selected: true,
          type: 0
        },
        {
          text: 'Женщина',
          selected: false,
          type: 1
        }
      ],
      stateSelect: [],
      documentTypeSelect: [],
      docTypeValidation: null,
      docTypeMask: ''
    }
  },

  validations() {
    return {
      formModel: {
        surname: {
          required,
          maxLength: maxLength(50)
        },
        name: {
          required,
          maxLength: maxLength(50)
        },
        patronymic: {
          maxLength: maxLength(50)
        },
        birthday: { required },
        state: { required },
        documentType: { required },
        documentNumber: {
          regex: (value: string) => {
            if (this.docTypeValidation !== null) {
              return this.docTypeValidation.test(value)
            }
            return false
          }
        }
      }
    }
  },

  methods: {
    handleSubmit() {
      if (!this.getAuthKey) {
        this.$store.commit(
          'mutAlertText',
          'Вы не авторизованы. Смена пароля невозможна'
        )
        return
      }

      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)
        this.$services
          .editProfile(this.processedFormModel, {
            headers: {
              Authorization: `Bearer  ${this.getAuthKey}`
            }
          })
          .then((res) => {
            this.$store.commit('mutIsLoading', false)
            if (res.status === this.ERequestStatus.Success) {
              this.formModel = {} as IUserProfileUpdateForm
              this.$store.commit('mutUserInfo', res)
              this.$emit('onProfileEditSuccess')
            } else {
              this.$store.commit(
                'mutAlertText',
                'Ошибка при попытке обновить профиль'
              )
            }
          })
      }
    }
  },

  watch: {
    formModel: {
      deep: true,
      handler() {
        switch (this.formModel.documentType) {
          case '2':
            this.docTypeMask = MaskRegExps.birthCertificate
            this.docTypeValidation = FormRegExps.birthCertificate
            break
          case '3':
            this.docTypeMask = MaskRegExps.passportRus
            this.docTypeValidation = FormRegExps.passportRus
            break
          case '13':
            this.docTypeMask = MaskRegExps.foreignPassport
            this.docTypeValidation = FormRegExps.foreignPassport
            break
          default:
            this.docTypeMask = ''
            this.docTypeValidation = null
            break
        }
      }
    }
  },

  created() {
    this.$utils.fillSameFields(this.formModel, this.getUserInfo)
    if (!isEmpty(this.getUserInfo)) {
      if (this.getUserInfo?.document) {
        this.formModel.documentType = String(this.getUserInfo.document) || '3'
        this.formModel.documentNumber = this.getUserInfo.documentNum || ''
      } else {
        this.formModel.documentType = '3'
      }

      this.formModel.state = this.getUserInfo?.state || 'RUS'
    }
    this.stateSelect = this.getStates(true).map((state: ISelectItem) => {
      return {
        ...state,
        selected: state.value === this.getUserInfo?.state || state.value === 'RUS'
      }
    })
    this.documentTypeSelect = this.getDocumentTypes(true).map((doc: ISelectItem) => {
      return {
        ...doc,
        selected: Number(doc.value) === this.getUserInfo?.document || doc.value === '3'
      }
    })
  }
})
</script>

<style scoped lang="scss">
@import '../Forms';
</style>
