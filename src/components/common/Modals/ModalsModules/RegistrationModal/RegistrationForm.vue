<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Регистрация</h2>
    <Switcher class="forms__switcher" :items="registrationTypes" @onChangeSelected="(type) => changeSelected(type)" />
    <FormFieldsIndividual
      v-if="currentRegistrationType === 'Individual'"
      v-model:formModel="formModelIndividual"
      :onRegistrationErrors="onRegistrationErrorMessages"
      @onSwitchRegType="changeSelected('Entity')"
    />
    <FormFieldsEntity
      v-if="currentRegistrationType === 'Entity'"
      v-model:formModel="formModelEntity"
      :onRegistrationErrors="onRegistrationErrorMessages"
      @onSwitchRegType="changeSelected('Individual')"
    />
    <Button
      kind="Primary"
      :isFluid="true"
      className="forms__submit-btn"
      @click="handleSubmit"
      :isDisabled="getIsLoading"
    >
      Зарегистрироваться
    </Button>
    <p class="forms__secondary-text">
      Рeгистрируясь на сайте, вы даете согласие на <a class="global_link" href="./documents/vityaz-aero_personal-data.pdf" target="_blank">обработку персональных
      данных</a>
    </p>
    <Button
      kind="Unstyled"
      className="forms__subbtn forms__subbtn_desktop"
      :isFluid="true"
      @click="switchToModal(EModalsNames.LogInModal)"
    >
      Вход
    </Button>
  </form>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Button from '@ui/Button/Button.vue'
import useVuelidate from '@vuelidate/core'
import Switcher, { ISwitcherItem } from '@shared/Switcher/Switcher.vue'
import { formMixin } from '@/mixins/formMixin'
import FormFieldsIndividual from './FormFieldsIndividual.vue'
import { EModalsNames } from '@/models/modals'
import { IRegistrationEntityForm, IRegistrationIndividualForm } from '@/models/forms/authForms'
import FormFieldsEntity from './FormFieldsEntity.vue'
import { IOnRegistrationErrorMessages } from './types'

type TRegistrationType = 'Individual' | 'Entity'

interface IRegistrationTypes extends ISwitcherItem {
  type: TRegistrationType
}

interface IData {
  registrationTypes: IRegistrationTypes[],
  formModelIndividual: IRegistrationIndividualForm,
  formModelEntity: IRegistrationEntityForm
  onRegistrationErrorMessages: IOnRegistrationErrorMessages,
}

export default defineComponent({
  name: 'RegistrationForm',
  components: {
    Button,
    FormFieldsIndividual,
    Switcher,
    FormFieldsEntity,
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },

  data(): IData {
    return {
      registrationTypes: [
        { text: 'Физ. лицо', selected: true, type: 'Individual' },
        { text: 'Юр. лицо, ИП', type: 'Entity' }
      ],
      onRegistrationErrorMessages: {
        emailTaken: ''
      },
      formModelIndividual: {
        email: '',
        name: '',
        password: '',
        phone: '',
        surname: '',
        title: '',
        type: 1,
      },
      formModelEntity: {
        info: {
          account: '',
          address: '',
          addressPost: '',
          bank: '',
          bic: '',
          correspondent_account: '',
          fullTitle: '',
          kpp: '',
          inn: '',
          ogrn: '',
        },
        email: '',
        name: '',
        password: '',
        phone: '',
        surname: '',
        title: '',
        type: 2,
      },
    }
  },
  methods: {
    handleSubmit(): void {
      this.v$.$touch()
      if (!this.v$.$error) {
        this.$store.commit('mutIsLoading', true)
        this.v$.$reset()
        this.$services.register(this[`formModel${this.currentRegistrationType}`]).then((res) => {
          this.$store.commit('mutIsLoading', false)
          if (res.status === this.ERequestStatus.Success) {
            this.$emit('onRegistrationSuccess')
            return
          }
          if (res.statusCode === 422) {
            this.onRegistrationErrorMessages.emailTaken = this.ErrorMessages.emailTaken
          }
        })
      }
    },

    changeSelected(type: TRegistrationType): void {
      this.onRegistrationErrorMessages.emailTaken = ''
      this.registrationTypes = this.registrationTypes.map((item) => {
        return {
          ...item,
          selected: item.type === type
        }
      })
    },

    switchToModal(name: EModalsNames): void{
      this.$store.commit('mutOpenedModalName', name)
    },
  },

  watch: {
    formEmailsToWatch() {
      this.onRegistrationErrorMessages.emailTaken = ''
    }
  },

  computed: {
    ...mapGetters(['getIsLoading']),
    formEmailsToWatch() {
      return [this.formModelIndividual.email, this.formModelEntity.email]
    },

    currentRegistrationType() {
      return this.registrationTypes.find((item) => item.selected)?.type
    }
  }
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
