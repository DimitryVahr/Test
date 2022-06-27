<template>
  <div class='partnerCard'>
    <a class="partnerCard__link" :href="content.link" target="_blank">
      <div class="partnerCard__logo" :class="{ partnerCard__logo_fullWidth: content.fullWidthLogo }">
        <img :src="require(`@/assets/img/main/${content.logoImgName}.png`)" :alt="content.name">
      </div>
      <div class="partnerCard__text">
        <h5 class="partnerCard__name">{{ content.name }}</h5>
        <p class="partnerCard__description">{{ content.description }}</p>
      </div>
    </a>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { IPartnerCard } from '../types'

export default defineComponent({
  name: 'PartnerCard',
  props: {
    /**
     * Контент карточки партнеров
     */
    content: {
      required: true,
      type: Object as PropType<IPartnerCard>
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'PartnerCard';
</style>
