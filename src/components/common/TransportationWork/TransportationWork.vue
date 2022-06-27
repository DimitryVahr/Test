<template>
  <HeadBannerVideo :video="headbannerVideo">
    <TransportationWorkHeadbanner/>
  </HeadBannerVideo>
  <TransportationWorkDescription/>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { IHeadBannerVideo } from '@shared/HeadBannerVideo/types'
import HeadBannerVideo from '@shared/HeadBannerVideo/HeadBannerVideo.vue'
import TransportationWorkHeadbanner from './TransportationWorkHeadbanner/TransportationWorkHeadbanner.vue'
import TransportationWorkDescription from './TransportationWorkDescription/TransportationWorkDescription.vue'

interface IData {
  headbannerVideo: IHeadBannerVideo
}

export default defineComponent({
  name: 'TransportationWork',
  components: {
    TransportationWorkHeadbanner,
    HeadBannerVideo,
    TransportationWorkDescription
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
@import 'TransportationWork';
</style>
