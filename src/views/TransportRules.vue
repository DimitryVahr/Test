<template>
  <CommonLayout>
    <TransportationRules/>
  </CommonLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'
import TransportationRules from '@/components/common/TransportationRules/TransportationRules.vue'

export default defineComponent({
  name: 'TransportRules',
  components: {
    CommonLayout,
    TransportationRules,
  }
})
</script>
