<template>
  <div class="flightRegItem" id="ContactForm">
    <h2 class="h2 flightRegItem__title">Контактное лицо</h2>
    <div class="flightRegItem__block">
      <Input
        label="Фамилия"
        v-model:inputModel="formModel.surname"
        :isError="isFieldError(v$.formModel.$errors, 'surname')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'surname')"
      />
      <Input
        label="Имя"
        v-model:inputModel="formModel.name"
        :isError="isFieldError(v$.formModel.$errors, 'name')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'name')"
      />
      <Input
        label="Email"
        v-model:inputModel="formModel.email"
        :isError="isFieldError(v$.formModel.$errors, 'email')"
        :errorText="getFieldErrorMsg(v$.formModel.$errors, 'email')"
      />
      <div class="flightRegItem__grid_two">
        <Input
          label="Телефон"
          v-model:inputModel="formModel.phone"
          :mask="MaskRegExps.phone"
          :isError="isFieldError(v$.formModel.$errors, 'phone')"
          :errorText="getFieldErrorMsg(v$.formModel.$errors, 'phone')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import {
  email, helpers, maxLength, required
} from '@vuelidate/validators'
import Input from '@ui/Input/Input.vue'
import { IFlightRegUser } from '../types'
import { formMixin } from '@/mixins/formMixin'

interface IData {
  formValue: null | IFlightRegUser
}

export default defineComponent({
  name: 'FlightRegItemUser',
  emits: ['update:formModel'],
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate() }
  },

  components: {
    Input
  },

  props: {
    /**
     * Объект v-model
     */
    formModel: {
      required: true,
      type: Object as PropType<IFlightRegUser>
    }
  },

  data(): IData {
    return {
      formValue: null
    }
  },

  methods: {
    changeStatus(): void {
      if (!this.v$.$invalid) {
        this.$store.commit('mutFlightRegFormStatus', {
          formId: 'ContactForm',
          formType: 'Contact',
          status: 'Success'
        })
      } else {
        this.$store.commit('mutFlightRegFormStatus', {
          formId: 'ContactForm',
          formType: 'Contact',
          status: 'Normal'
        })
      }
    }
  },

  validations() {
    return {
      formModel: {
        surname: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          maxLength: helpers.withMessage(
            this.ErrorMessages.tooLong,
            maxLength(50)
          )
        },
        name: {
          required: helpers.withMessage(this.ErrorMessages.required, required),
          maxLength: helpers.withMessage(
            this.ErrorMessages.tooLong,
            maxLength(50)
          )
        },
        email: {
          email: helpers.withMessage(this.ErrorMessages.emailFormat, email),
          required: helpers.withMessage(this.ErrorMessages.required, required)
        },
        phone: {
          phoneFormat: helpers.withMessage(
            this.ErrorMessages.phoneLength,
            helpers.regex(this.FormRegExps.phone)
          ),
          required: helpers.withMessage(this.ErrorMessages.required, required)
        }
      }
    }
  },

  watch: {
    formModel: {
      deep: true,
      handler() {
        this.formValue = this.formModel
        this.changeStatus()
      }
    },
    formValue() {
      this.changeStatus()
      this.$emit('update:formModel', this.formValue)
    },
    v$() {
      if (this.v$.$error) {
        this.$store.commit('mutFlightRegFormStatus', {
          formId: 'ContactForm',
          formType: 'Contact',
          status: 'Error',
          errorText: 'Заполните данные контактного лица'
        })
      }
    }
  },

  computed: {
    ...mapGetters(['getStates', 'getDocumentTypes'])
  },

  mounted() {
    this.formValue = this.formModel
  }
})
</script>

<style scoped lang="scss">
@import 'FlightRegForm';
</style>
