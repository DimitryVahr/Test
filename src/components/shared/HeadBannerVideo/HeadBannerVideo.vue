<template>
  <section class="headBannerVideo">
    <div class="headBannerVideo__bg">
      <video playsinline muted loop autoplay :poster="require(`@/assets/img/headbannerBg/${video.posterName}`)" v-if="video">
        <source v-for="(source, i) in video.sources" :key="source.type + i" :type="source.type"  :src="require(`@/assets/headbannerVideos/${source.srcVideoName}`)">
      </video>
    </div>
    <div class="headBannerVideo__content">
      <slot />
    </div>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { IHeadBannerVideo } from './types'

export default defineComponent({
  name: 'HeadBannerVideo',
  props: {
    /**
     * Данные видео
     */
    video: {
      required: true,
      type: Object as PropType<IHeadBannerVideo>,
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'HeadBannerVideo';
</style>
