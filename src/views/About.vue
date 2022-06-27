<template>
  <CommonLayout>
    <AboutCompany />
  </CommonLayout>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import AboutCompany from '@common/AboutCompany/AboutCompany.vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'

export default defineComponent({
  components: { CommonLayout, AboutCompany },
  name: 'About',
})
</script>
