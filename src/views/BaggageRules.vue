<template>
  <CommonLayout>
    <Baggage/>
  </CommonLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'
import Baggage from '@/components/common/Baggage/Baggage.vue'

export default defineComponent({
  name: 'BaggageRules',
  components: {
    CommonLayout,
    Baggage,
  }
})
</script>
