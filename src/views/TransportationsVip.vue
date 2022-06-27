<template>
  <CommonLayout>
    <TransportationVip/>
  </CommonLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'
import TransportationVip from '@/components/common/TransportationVip/TransportationVip.vue'

export default defineComponent({
  name: 'TransportationsVip',
  components: {
    CommonLayout,
    TransportationVip,
  },
  mounted() {
    window.scrollTo(0, 0)
  }
})
</script>
