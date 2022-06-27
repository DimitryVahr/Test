<template>
  <HeadBannerVideo :video="headbannerVideo">
    <TransportationsHeadbanner />
  </HeadBannerVideo>
  <RegularFlights />
  <RemoteLocations />
  <AdditionalInfo />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { IHeadBannerVideo } from '@shared/HeadBannerVideo/types'
import HeadBannerVideo from '@shared/HeadBannerVideo/HeadBannerVideo.vue'
import RegularFlights from './RegularFlights/RegularFlights.vue'
import RemoteLocations from './RemoteLocations/RemoteLocations.vue'
import AdditionalInfo from './AdditionalInfo/AdditionalInfo.vue'
import TransportationsHeadbanner from './TransportationsHeadbanner/TransportationsHeadbanner.vue'

interface IData {
  headbannerVideo: IHeadBannerVideo
}

export default defineComponent({
  name: 'Transportations',
  components: {
    RegularFlights,
    RemoteLocations,
    AdditionalInfo,
    HeadBannerVideo,
    TransportationsHeadbanner
  },
  data(): IData {
    return {
      headbannerVideo: {
        sources: [
          { type: 'video/mp4', srcVideoName: 'transportations.mp4' }
        ],
        posterName: 'transportations.jpg'
      }
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'Transportations';
</style>
