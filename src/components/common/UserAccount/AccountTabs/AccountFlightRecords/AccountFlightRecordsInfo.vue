<template>
  <div class="accountTabs__tab">
    <h2 class="accountTabs__titleMain">Записи на рейс</h2>
    <div class="accountTabs__section accountTabs_mobileFullWidth">
      <table
        class="accountTabs__table"
        v-if="getFlightRecords.length > 0"
      >
        <tr
          class="accountTabs__tableRow"
          v-for="record in getFlightRecords"
          :key="record.id"
          @click="showRecordInfo(record.id)"
        >
          <td class="accountTabs__tableCell_date">{{ record.data.itinerary.datefrom }}</td>
          <td class="accountTabs__tableCell_route">
            {{
              record.data.itinerary.placefrom.title + ' — ' + record.data.itinerary.placeto.title
            }}
          </td>
          <td class="accountTabs__tableCell_status">{{ $utils.getFlightStatus(record.status) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { EAccountFlightScreens } from '@/models/userAccount/flights'

export default defineComponent({
  name: 'AccountFlightRecordsInfo',
  computed: {
    ...mapGetters([
      'getFlightRecords'
    ])
  },
  methods: {
    showRecordInfo(recordId: number) {
      this.$store.commit('mutSelectedFlightId', recordId)
      this.$emit('switchFlightScreen', EAccountFlightScreens.AccountFlightRecordsFlight)
    }
  }
})
</script>

<style scoped lang='scss'>
@import '../../UserAccount';
@import '../AccountTabs';
@import 'AccountFlightRecords';
</style>
