<template>
  <CommonLayout>
    <FlightReg/>
  </CommonLayout>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import FlightReg from '@common/FlightRegistration/FlightReg.vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'

export default defineComponent({
  name: 'FlightRegistration',
  components: { FlightReg, CommonLayout }
})
</script>
