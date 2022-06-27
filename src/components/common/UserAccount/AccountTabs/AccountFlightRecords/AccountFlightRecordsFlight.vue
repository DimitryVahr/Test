<template>
  <div class="accountTabs__tab" v-if="flightRecord.id !== undefined">
    <Button
      kind="Secondary"
      :noBorder="true"
      :withIcon="true"
      className="accountTabs__bottomActionBtnLink userAccount_textLinkThinSmall accountTabs__goBack"
      @click="showAllFlightRecords"
    >
      <Icon
        :name="EIconNames.ArrowLeft"
        width="24"
        height="24"
        class="accountTabs__btnIcon distant"
      />
      <span>Назад</span>
    </Button>

    <h2 class="accountTabs__titleMainUnderBtn">Записи на рейс</h2>

    <div class="accountTabs__section">
      <h3 class="accountTabs__sectionTitle">
        Информация о записи
      </h3>

      <div class="accountTabs__row_mobile">
        <span class="userAccount_textSecondary">Статус</span>
        <p class="userAccount_textCommon">
          {{ $utils.getFlightStatus(flightRecord.status) }}
        </p>
      </div>

      <div class="accountTabs__row_mobile">
        <span class="userAccount_textSecondary">Дата полета</span>
        <p class="userAccount_textCommon">
          {{ $utils.formatDate(flightRecord.data.itinerary.datefrom, 'DD.MM.YYYY, dddd') }}
        </p>
      </div>

      <div class="accountTabs__row_mobile">
        <span class="userAccount_textSecondary">Маршрут</span>
        <p class="userAccount_textCommon">
          {{
            flightRecord.data.itinerary.placefrom.title + ' — ' + flightRecord.data.itinerary.placeto.title
          }}
        </p>
      </div>

      <div class="accountTabs__row_mobile">
        <span class="userAccount_textSecondary">Пассажиры</span>
        <p class="userAccount_textCommon">
          {{ flightRecord.data.passengers.length }}
        </p>
      </div>

    </div>

    <div class="accountTabs__section">
      <h3 class="accountTabs__sectionTitle">
        Информация об оплате
      </h3>

      <div class="accountTabs__row_mobile">
        <span class="userAccount_textSecondary">Общая стоимость</span>
        <p class="userAccount_textCommon">
          {{ $utils.formatNumber(flightRecord.data.itinerary.totalPrice) }}
        </p>
      </div>

      <div class="accountTabs__row_mobile">
        <span class="userAccount_textSecondary">Бонусы</span>
        <div v-if="bonusInfoItem.amount">
          <p class="userAccount_textCommonSmall">
            {{ bonusInfoItem.status.title }}
          </p>
          <p :class="`userAccount_textCommon flightRecords__bonus_${bonusInfoItem.status.alias}`">
            {{ bonusInfoItem.amount > 0 ? `+${ bonusInfoItem.amount }` : bonusInfoItem.amount }}
          </p>
        </div>
        <p
          class="userAccount_textCommon"
          v-else
        >
          —
        </p>
      </div>
    </div>

    <div
      v-for="passenger in flightRecord.data.passengers"
      :key="passenger.id"
      class="accountTabs__section"
    >

      <div class="accountTabs__sectionSmall">
        <h2 class="accountTabs__sectionTitle">Пассажиры</h2>

        <h3 class="accountTabs__sectionTitle">
          {{ passenger.lastName }} {{ passenger.firstName }} {{ passenger.patronymic || '' }}
        </h3>

        <div class="accountTabs__row_mobile">
          <span class="userAccount_textSecondary">Пол</span>
          <p class="userAccount_textCommon">
            {{ passenger.sex === '0' ? 'Мужской' : 'Женский' }}
          </p>
        </div>

        <div class="accountTabs__row_mobile">
          <span class="userAccount_textSecondary">Дата рождения</span>
          <p class="userAccount_textCommon">
            {{ passenger.birthday }}
          </p>
        </div>

        <div class="accountTabs__row_mobile">
          <span class="userAccount_textSecondary">Телефон</span>
          <p class="userAccount_textCommon">
            {{ $utils.formatPhone(passenger.phone) }}
          </p>
        </div>

        <div class="accountTabs__row_mobile">
          <span class="userAccount_textSecondary">{{
              $utils.getDocType(passenger.documentType, passenger.isLocal)
            }}</span>
          <p class="userAccount_textCommon">
            {{ passenger.documentNumber }}
          </p>
        </div>
      </div>

      <div>
        <h4 class="accountTabs__row">
          Тариф
        </h4>

        <div class="accountTabs__row_mobile">
          <span class="userAccount_textSecondary">Категория пассажира</span>
          <p class="userAccount_textCommon">
            {{ $utils.getPassengerType(passenger.type) }}
          </p>
        </div>

        <div>
          <span class="userAccount_textSecondary">Стоимость</span>
          <p class="userAccount_textCommon">
            {{ $utils.formatNumber(flightRecord.data.itinerary.tariff[passenger.type]) }}
          </p>
        </div>

      </div>

    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { mapGetters } from 'vuex'
import { IFlightRecord } from '@/models/userAccount/flights'
import { ERequestStatus } from '@/models/status'
import { IBonusesTransactionItem } from '@/models/userAccount/api'

interface IData {
  flightRecord: IFlightRecord
  bonusInfoItem: IBonusesTransactionItem
}

export default defineComponent({
  name: 'AccountFlightRecordsFlight',
  components: {
    Button,
    Icon
  },
  data: (): IData => {
    return {
      flightRecord: {} as IFlightRecord,
      bonusInfoItem: {} as IBonusesTransactionItem
    }
  },
  computed: {
    ...mapGetters([
      'getSelectedFlightId',
      'getSpecificBonus',
      'getAuthConfig'
    ])
  },
  methods: {
    showAllFlightRecords(): void {
      this.$emit('switchFlightScreen', 'AccountFlightRecordsInfo')
    },
  },
  created(): void {
    this.$services.getFlightRecord(this.getSelectedFlightId, this.getAuthConfig)
      .then((res) => {
        if (res.status === ERequestStatus.Success) {
          this.flightRecord = res.flightRecord as IFlightRecord
          this.bonusInfoItem = this.getSpecificBonus(this.flightRecord.id)
          this.$store.commit('mutSingleFlightRecord', res.flightRecord)
        } else {
          this.$store.commit('mutAlertText', 'Ошибка получения информации о рейсе')
        }
      })
  }
})
</script>

<style scoped lang='scss'>
@import '../../UserAccount';
@import '../AccountTabs';
@import 'AccountFlightRecords';
</style>
