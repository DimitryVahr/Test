<template>
  <HeadBannerVideo :video="headbannerVideo">
    <AboutCompanyHeadbanner />
  </HeadBannerVideo>
  <SafetyComfort />
  <Stats />
  <Reputation />
  <Documents />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { IHeadBannerVideo } from '@shared/HeadBannerVideo/types'
import HeadBannerVideo from '@shared/HeadBannerVideo/HeadBannerVideo.vue'
import AboutCompanyHeadbanner from './AboutCompanyHeadbanner/AboutCompanyHeadbanner.vue'
import SafetyComfort from './SafetyComfort/SafetyComfort.vue'
import Stats from './Stats/Stats.vue'
import Reputation from './Reputation/Reputation.vue'
import Documents from './Documents/Documents.vue'

interface IData {
  headbannerVideo: IHeadBannerVideo,
}

export default defineComponent({
  components: {
    HeadBannerVideo,
    AboutCompanyHeadbanner,
    SafetyComfort,
    Stats,
    Reputation,
    Documents,
  },
  name: 'AboutCompany',
  data(): IData {
    return {
      headbannerVideo: {
        sources: [
          { type: 'video/mp4', srcVideoName: 'aboutCompany.mp4' }
        ],
        posterName: 'transportations.jpg'
      }
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'AboutCompany';
</style>
