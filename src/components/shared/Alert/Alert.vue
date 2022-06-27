<template>
  <transition name="fade">
    <div v-if="getAlertText" class="alert">
      <span class="alert__text">{{ getAlertText }}</span>
    </div>
  </transition>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'Alert',

  computed: {
    ...mapGetters(['getAlertText']),
  },

  watch: {
    getAlertText(value) {
      if (value) {
        setTimeout(() => {
          this.$store.commit('mutAlertText', '')
        }, 3000)
      }
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'Alert';
</style>
