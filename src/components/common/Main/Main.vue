<template>
  <MainHeadBanner/>
  <Services/>
  <Partners/>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import MainHeadBanner from '@common/Main/MainHeadBanner/MainHeadBanner.vue'
import Services from './Services/Services.vue'
import Partners from './Partners/Partners.vue'

export default defineComponent({
  name: 'Main',
  components: { MainHeadBanner, Services, Partners }
})
</script>
