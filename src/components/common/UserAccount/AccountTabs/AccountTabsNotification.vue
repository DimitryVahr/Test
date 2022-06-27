<template>
  <div class="accountTabsNotification">
    <h3 class="accountTabsNotification__title">{{title}}</h3>
    <p class="accountTabsNotification__text">{{text}}</p>
    <slot/>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { EModalsNames } from '@/models/modals'

export default defineComponent({
  name: 'AccountTabsNotification',
  props: {
    title: {
      required: false,
      type: String
    },
    text: {
      required: false,
      type: String
    }
  },
  components: {
  },
  methods: {
    switchToModal(modalName: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalName)
    },
  }
})
</script>

<style scoped lang='scss'>
@import 'AccountTabsNotification';
</style>
