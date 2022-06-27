<template>
  <CommonLayout>
    <Transportations />
  </CommonLayout>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Transportations from '@common/Transportations/Transportations.vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'

export default defineComponent({
  components: { CommonLayout, Transportations },
  name: 'Transportation',
  mounted() {
    window.scrollTo(0, 0)
  }
})
</script>
