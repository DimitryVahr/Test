<template>
  <form @submit.prevent="">
    <h2 class="forms__title">Отправить сообщение</h2>
    <div class="forms__content">
      <Select label="Кому" :items="receiversList" v-model:selectModel="receiver" />
      <Input
        v-model:inputModel="formModel.email"
        label="Эл. почта"
        :isError="isFieldError(v$.formModel.$errors, 'email')"
      />
      <Input
        v-model:inputModel="formModel.name"
        label="Фамилия, имя, отчество"
        :isError="isFieldError(v$.formModel.$errors, 'name')"
      />
      <Select
        label="Тема сообщения"
        v-model:selectModel="formModel.theme"
        :items="themesList"
        v-if="receiver === 'vityaz'"
        :isError="isFieldError(v$.formModel.$errors, 'theme')"
      />
      <Textarea
        label="Сообщение"
        v-model:textareaModel="formModel.text"
        :isError="isFieldError(v$.formModel.$errors, 'text')"
      />
    </div>
    <Button
      kind="Primary"
      :isFluid="true"
      className="forms__submit-btn"
      @click="handleSubmit"
      :isDisabled="getIsLoading"
    >
      Отправить
    </Button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Input from '@ui/Input/Input.vue'
import Textarea from '@ui/Textarea/Textarea.vue'
import Button from '@ui/Button/Button.vue'
import Select from '@ui/Select/Select.vue'
import useVuelidate from '@vuelidate/core'
import { and, email, required } from '@vuelidate/validators'
import { formMixin } from '@/mixins/formMixin'
import { ISendMessageForm } from '@/models/forms/messageForms'
import { ISelectItem } from '@/models/breadcrumbs'

type TReceivers = 'vityaz' | 'director'

interface IData {
  formModel: ISendMessageForm
  receiversList: ISelectItem[]
  themesList: ISelectItem[]
  receiver: TReceivers
}

export default defineComponent({
  name: 'SendMessageForm',
  components: {
    Button,
    Textarea,
    Input,
    Select
  },
  mixins: [formMixin],
  setup() {
    return { v$: useVuelidate({ $lazy: true }) }
  },

  data: (): IData => {
    return {
      formModel: {
        email: '',
        name: '',
        theme: '',
        text: ''
      },
      receiver: 'vityaz',
      receiversList: [
        {
          label: 'ВИТЯЗЬ-АЭРО',
          value: 'vityaz',
          selected: true
        },
        {
          label: 'Генеральному директору',
          value: 'director'
        }
      ],
      themesList: [
        {
          label: 'Билеты',
          value: 'Билеты'
        },
        {
          label: 'Процедура записи и регистрации на рейс',
          value: 'Процедура записи и регистрации на рейс'
        },
        {
          label: 'Коммерческие перевозки',
          value: 'Коммерческие перевозки'
        },
        {
          label: 'Тарифы и расписание рейсов',
          value: 'Тарифы и расписание рейсов'
        },
        {
          label: 'Перевозка багажа и грузов',
          value: 'Перевозка багажа и грузов'
        },
        {
          label: 'Отзывы и предложения',
          value: 'Отзывы и предложения'
        },
        {
          label: 'Другое',
          value: 'Другое'
        }
      ]
    }
  },

  validations() {
    return {
      formModel: {
        email: {
          reqOrEmail: and(email, required)
        },
        name: { required },
        theme: { required },
        text: { required }
      }
    }
  },

  methods: {
    handleSubmit() {
      this.v$.$touch()
      if (!this.v$.formModel.$error) {
        this.$store.commit('mutIsLoading', true)
        // this.formModel = {} as ISendMessageForm
        this.v$.$reset()
        this.$services.contact(this.formModel).then((res) => {
          this.$store.commit('mutIsLoading', false)
          if (res.status === this.ERequestStatus.Success) {
            this.$emit('onSuccessSend')
          }
        })
      }
    }
  },

  computed: {
    ...mapGetters(['getUserInfo', 'getIsMessageToDirector', 'getIsLoading'])
  },

  watch: {
    receiver(newValue: TReceivers) {
      if (newValue === 'director') {
        this.formModel.theme = 'Обращение к генеральному директору'
      }
    }
  },

  mounted() {
    if (this.getUserInfo && this.getUserInfo.email && this.getUserInfo.name) {
      this.formModel.email = this.getUserInfo.email
      this.formModel.name = `${this.getUserInfo.surname} ${this.getUserInfo.name} ${this.getUserInfo.patronymic || ''}`
    }

    if (this.getIsMessageToDirector) {
      this.receiver = 'director'
      this.receiversList = this.receiversList.map((item) => {
        return {
          ...item,
          selected: item.value === 'director'
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
@import '../Forms';
</style>
