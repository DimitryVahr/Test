<template>
  <HeadBannerVideo :video="headbannerVideo">
    <TransportationVipHeadbanner/>
  </HeadBannerVideo>
  <TransportationVipDescription/>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { IHeadBannerVideo } from '@shared/HeadBannerVideo/types'
import HeadBannerVideo from '@shared/HeadBannerVideo/HeadBannerVideo.vue'
import TransportationVipHeadbanner from './TransportationVipHeadbanner/TransportationVipHeadbanner.vue'
import TransportationVipDescription from './TransportationVipDescription/TransportationVipDescription.vue'

interface IData {
  headbannerVideo: IHeadBannerVideo
}

export default defineComponent({
  name: 'TransportationVip',
  components: {
    HeadBannerVideo,
    TransportationVipHeadbanner,
    TransportationVipDescription
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
@import 'TransportationVip';
</style>
