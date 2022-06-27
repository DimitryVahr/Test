<template>
  <HeadBannerVideo :video="headBannerVideo">
    <Container>
      <h1 class="mainHeadBanner__title">
        Перелёты <br/> по&nbsp;Камчатке
      </h1>
      <FlightFormsSmall/>
      <KamchatkaInfo/>
    </Container>
  </HeadBannerVideo>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import HeadBannerVideo from '@shared/HeadBannerVideo/HeadBannerVideo.vue'
import { IHeadBannerVideo } from '@shared/HeadBannerVideo/types'
import Container from '@shared/Container/Container.vue'
import FlightFormsSmall from '@common/Main/MainHeadBanner/FlightFormsSmall/FlightFormsSmall.vue'
import KamchatkaInfo from '@common/Main/MainHeadBanner/KamchatkaInfo/KamchatkaInfo.vue'

interface IData {
  headBannerVideo: IHeadBannerVideo
}

export default defineComponent({
  name: 'MainHeadBanner',
  components: {
    KamchatkaInfo,
    FlightFormsSmall,
    Container,
    HeadBannerVideo,
  },
  data(): IData {
    return {
      headBannerVideo: {
        sources: [
          { type: 'video/mp4', srcVideoName: 'main.mp4' }
        ],
        posterName: 'transportations.jpg'
      }
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'MainHeadBanner';
</style>
