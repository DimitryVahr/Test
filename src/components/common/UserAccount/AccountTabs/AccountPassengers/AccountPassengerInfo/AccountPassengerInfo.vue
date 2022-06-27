<template>
  <div class="accountPassengerInfo">
    <Button
      kind="Unstyled"
      @click="goBack"
      class="accountPassengerInfo__goBackBtn"
    >
      <Icon
        :height="24"
        :width="24"
        :name="EIconNames.ArrowLeft"
        class="accountPassengerInfo__goBackBtnIcon"
      />Назад
    </Button>
    <div class="accountPassengerInfo__name">
      <h2>
        {{ getPassenger.firstName }} {{ getPassenger.lastName }}
        {{ getPassenger.patronymic }}
      </h2>
    </div>
    <h3 class="accountPassengerInfo__title">Персональная информация</h3>
    <div class="accountPassengerInfo__item">
      <span class="accountPassengerInfo__itemTitle">Пол</span>
      <span class="accountPassengerInfo__itemInfo">{{ passengerSex }}</span>
    </div>
    <div class="accountPassengerInfo__item">
      <span class="accountPassengerInfo__itemTitle">Дата рождения</span>
      <span class="accountPassengerInfo__itemInfo">{{
        getPassenger.birthday
      }}</span>
    </div>
    <div class="accountPassengerInfo__item">
      <span class="accountPassengerInfo__itemTitle">Телефон</span>
      <span class="accountPassengerInfo__itemInfo">{{
        formatNumberPhone
      }}</span>
    </div>

    <h3 class="accountPassengerInfo__title">Документы</h3>
    <div class="accountPassengerInfo__item">
      <span class="accountPassengerInfo__itemTitle">{{ typeDocument }}</span>
      <span class="accountPassengerInfo__itemInfo">{{
        getPassenger.documentNumber
      }}</span>
    </div>

    <Button
      kind="Unstyled"
      class="accountPassengerInfo__scanDocBtn"
      v-if="getPassenger.images.length > 0"
      @click="showScans"
      >Сканы документов</Button
    >

    <h3 class="accountPassengerInfo__title">Участие в программе лояльности</h3>
    <div class="accountPassengerInfo__item">
      <span class="accountPassengerInfo__itemTitle"
        >Персональный бонусный счет</span
      >
      <span class="accountPassengerInfo__itemInfo">{{
        getPassenger.bonusCard || '—'
      }}</span>
    </div>
    <div class="accountPassengerInfo__btnWrap">
      <Button
        kind="Primary"
        :withIcon="true"
        className="accountPassengerInfo__changeInfoBtn"
        @click="openModal(EModalsNames.ChangePassengerModal)"
      >
        <Icon
          :name="EIconNames.Edit"
          width="24"
          height="24"
          class="accountTabs__btnIcon"
        />
        <span>Изменить данные</span>
      </Button>
      <Button
        kind="Unstyled"
        class="accountPassengerInfo__deletePassenger"
        @click="openModal(EModalsNames.DeletePassengerModal)"
      >
        <Icon :name="EIconNames.DeleteFile" width="24" height="24" />
        <span class="accountPassengerInfo__deletePassengerText"
          >Удалить пассажира</span
        ></Button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { mapGetters } from 'vuex'
import { EModalsNames } from '@/models/modals'

export default defineComponent({
  name: 'AccountPassengerInfo',
  components: {
    Button,
    Icon
  },
  methods: {
    goBack(): void {
      this.$store.commit('mutPassenger', null)
    },
    openModal(modalName: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalName)
    },
    showScans(): void {
      this.$store.commit('mutOpenedAdditionalModalName', EModalsNames.ScansSliderModal)
    }
  },
  computed: {
    ...mapGetters(['getPassenger']),
    passengerSex(): string {
      return this.getPassenger.sex === 0 ? 'Мужской' : 'Женский'
    },
    formatNumberPhone(): string {
      return this.$utils.formatPhone(this.getPassenger.phone)
    },
    typeDocument(): string {
      switch (this.getPassenger.documentType) {
        case 1:
          return 'Временное удостоверение личности'
        case 2:
          return 'Свидетельство о рождении'
        case 3:
          return 'Паспорт РФ'
        case 4:
          return 'Справка об освобождении'
        case 5:
          return 'Справка о рождении'
        case 6:
          return 'Паспорт моряка'
        case 7:
          return 'Служебное удостоверение'
        case 8:
          return 'Удостоверение депутата ФС ГД'
        case 9:
          return 'Удостоверение личности военнослужащего'
        case 10:
          return 'Заграничный паспорт'
        case 11:
          return 'Военный билет'
        case 12:
          return 'Отсутствует'
        case 13:
          return 'Паспорт иностранного гражданина'
        case 14:
          return 'Удостоверение личности лица без гражданства'
        case 15:
          return 'Вид на жительство иностранного гражданина или лица без гражданства'
        case 16:
          return 'Паспорт гражданина СССР'
        case 17:
          return 'Паспорт дипломатический'
        case 18:
          return 'Паспорт служебный'
        case 19:
          return 'Свидетельство о возвращении из стран СНГ'
        case 20:
          return 'Справка об утере паспорта'
        case 21:
          return 'Справка о рождении'
        default:
          return ''
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import 'AccountPassengerInfo';
</style>
