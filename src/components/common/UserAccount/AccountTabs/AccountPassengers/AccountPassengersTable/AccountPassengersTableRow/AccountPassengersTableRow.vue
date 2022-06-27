<template>
  <div class='accountPassengersTableRow'>
    <Button kind = "Unstyled" @click="showPassengerInfo" href="" class="accountPassengersTableRow__name">
      <span>{{content.firstName}}</span>
      <span class="accountPassengersTableRow__lastName">{{content.lastName}}</span>
      <span>{{content.patronymic}}</span>
    </Button>
    <span class="accountPassengersTableRow__type">{{ typePassenger }}</span>
  </div>
</template>

<script lang='ts'>
import { mapGetters } from 'vuex'
import Button from '@ui/Button/Button.vue'
import { defineComponent, PropType } from 'vue'
import { IPassengerInfo } from '@/models/userAccount/api'

export default defineComponent({
  name: 'AccountPassengersTableRow',
  components: {
    Button,
  },
  props: {
    content: {
      required: true,
      type: Object as PropType <IPassengerInfo>,
    },
  },
  computed: {
    ...mapGetters([
      'getAuthKey'
    ]),

    typePassenger(): string {
      switch (this.content.type) {
        case 'child':
          return 'Ребенок 2-12 лет гражданин РФ'
        case 'adult':
          return 'Взрослый гражданин РФ'
        case 'adultLocal':
          return 'Взрослый с пропиской в Камчатском крае'
        case 'infant':
          return 'Ребенок до 2х лет'
        case 'adultForeign':
          return 'Взрослый гражданин иностранного государства'
        case 'childForeign ':
          return 'Ребенок 2-12 лет иностранного государства'
        default:
          return ''
      }
    },
  },
  methods: {
    showPassengerInfo() {
      this.$services.getPassengerInfo({
        headers: {
          'Authorization': `Bearer ${ this.getAuthKey }`,
        }
      },
      this.content.id)
        .then((res) => {
          if (res.status === this.ERequestStatus.Success) {
            this.$store.commit('mutPassenger', res.data)
          }
        })
    },
  }
})
</script>

<style scoped lang='scss'>
@import 'AccountPassengersTableRow';
</style>
