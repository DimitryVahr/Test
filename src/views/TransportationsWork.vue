<template>
  <CommonLayout>
    <TransportationWork/>
  </CommonLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'
import TransportationWork from '@/components/common/TransportationWork/TransportationWork.vue'

export default defineComponent({
  name: 'TransportationsWork',
  components: {
    CommonLayout,
    TransportationWork,
  },
  mounted() {
    window.scrollTo(0, 0)
  }
})
</script>
