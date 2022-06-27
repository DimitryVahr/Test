<template>
  <Container>
    <InfoBlock class="infoBlock--top" title="Ваша запись на&nbsp;рейс ожидает подтверждения" description="">
        <template v-slot:slot1>
          <div class="status">
            <span class="status__title">Запись на&nbsp;рейс ожидает подтверждения, которое придет вам на&nbsp;электронную почту</span>
            <span class="status__text">Менеджер подтверждет заявки в&nbsp;течение трех рабочих дней. Это связано с&nbsp;наличием мест на&nbsp;рейсе.</span>
            <span class="status__text">Если вы&nbsp;не&nbsp;получили подтверждение в&nbsp;этот срок, пожалуйста, свяжитесь с&nbsp;нами по&nbsp;по&nbsp;телефону 8&nbsp;800&nbsp;250-69-69 и&nbsp;уточните статус вашей заявки.</span>
          </div>
        </template>
      </InfoBlock>
      <InfoBlock class="infoBlockWrap" title="Ваша запись" description="">
        <template v-slot:slot1>
          <div class="info">
            <div class="infoItem">
              <span class="infoItem__title">Рейс</span>
              <span class="infoItem__value from">{{ getFlightInfo.from }} — {{ getFlightInfo.to }}</span>
            </div>
            <div class="infoItem">
              <span class="infoItem__title">Туда</span>
              <span class="infoItem__value">{{ formatDate(getFlightInfo.dateTo) }}</span>
            </div>
            <div class="infoItem" v-if="getFlightInfo.dateBack">
              <span class="infoItem__title">Обратно</span>
              <span class="infoItem__value">{{ formatDate(getFlightInfo.dateBack) }}</span>
            </div>
            <div class="infoItem">
              <span class="infoItem__title">Пассажиры</span>
              <span class="infoItem__value">
                {{$utils.formatSimpleWord(getFlightInfo.passengers.length, 'пассажир')}}</span>
            </div>
            <div class="infoItem">
              <span class="infoItem__title">Общая стоимость билетов</span>
              <span class="infoItem__value">{{ getFlightInfo.bonusPaying > 0? getFlightInfo.totalPrice - getFlightInfo.bonusPaying : getFlightInfo.totalPrice }} р. / {{getFlightInfo.bonusPaying? getFlightInfo.bonusPaying:0}} баллов</span>
            </div>
            <div class="infoItem">
              <span class="infoItem__title">Начисление бонусов</span>
              <a class="infoItem__link" href="#">Согласно программе лояльности</a>
            </div>
          </div>
        </template>
      </InfoBlock>
      <InfoBlock class="infoBlockWrap" title="За день до вылета" description="">
        <template v-slot:slot1>
          <div class="infoWrap">
            <span class="infoWrap__title">Дата и время вылета</span>
            <p class="infoWrap__text">За&nbsp;день до&nbsp;вылета оператор позвонит пассажирам, записанным на&nbsp;рейс. Он&nbsp;назовет время вылета и&nbsp;скажет, во&nbsp;сколько нужно быть в&nbsp;аэропорту.</p>
          </div>
        </template>
        <template v-slot:slot2>
          <div class="infoWrap infoWrap--next">
            <span class="infoWrap__title">Изменение даты вылета</span>
            <p class="infoWrap__text">Из-за погодных условий вылет могут перенести на&nbsp;день раньше или позже даты, на&nbsp;которую вы&nbsp;записались. Об&nbsp;этом вам заранее сообщат по&nbsp;телефону.</p>
          </div>
        </template>
      </InfoBlock>
      <InfoBlock class="infoBlockWrap"  title="В день вылета" description="">
        <template v-slot:slot1>
          <div class="infoWrap">
            <span class="infoWrap__title">Регистрация на&nbsp;рейс</span>
            <p class="infoWrap__text">Зарегистрируйтесь на&nbsp;рейс в&nbsp;аэропорту вылета.</p>
          </div>
        </template>
        <template v-slot:slot2>
          <div class="infoWrap infoWrap--next">
            <span class="infoWrap__title">Оплата билетов</span>
            <p class="infoWrap__text">После регистрации на&nbsp;рейс, оплатите билеты наличными или банковской картой.</p>
          </div>
        </template>
      </InfoBlock>
      <InfoBlock class="infoBlockWrap" title="Часто задаваемые вопросы" description="">
        <template v-slot:slot1>
          <div class="infoWrap">
            <span class="infoWrap__title">Провоз багажа</span>
            <p class="infoWrap__text">Вы&nbsp;можете провезти 20&nbsp;кг багажа на&nbsp;человека. Пожалуйста, ознакомьтесь с&nbsp;правилами провоза багажа.</p>
            <router-link class="infoWrap__link" :to="{name:'BaggageRules'}">Правила провоза багажа</router-link>
          </div>
        </template>
        <template v-slot:slot2>
          <div class="infoWrap infoWrap--next">
            <span class="infoWrap__title">Отмена записи на&nbsp;рейс</span>
            <p class="infoWrap__text">Отменить запись можно в&nbsp;личном кабинете или по&nbsp;телефону 8&nbsp;800 250-69-69.</p>
          </div>
        </template>
      </InfoBlock>
  </Container>
</template>

<script lang='ts'>
import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import InfoBlock from '@ui/InfoBlock/InfoBlock.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'FlightRegSuccess',
  components: { Container, InfoBlock },

  methods: {
    formatDate(date: string): string {
      return format(parse(date, 'dd.MM.yyyy', new Date()), 'dd.MM.yyyy, iiii', {
        locale: ru
      })
    }
  },

  computed: {
    ...mapGetters(['getFlightInfo'])
  },

  created(): void {
    window.scrollTo(0, 0)
  },

  beforeUnmount() {
    this.$store.commit('mutPassengerFormSmall', {})
  }
})
</script>

<style scoped lang='scss'>
@import 'FlightRegSuccess';
</style>
