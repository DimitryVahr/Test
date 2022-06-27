<template>
  <div class='additionalServiceCard'>
    <a class="additionalServiceCard__link" :href="content.link" target="_blank">
      <div class="additionalServiceCard__poster">
        <img :src="require(`@/assets/img/main/${content.posterImgName}.jpg`)" :alt="content.title">
      </div>
      <div class="additionalServiceCard__content">
        <div class="additionalServiceCard__logo">
          <img :src="require(`@/assets/img/main/${content.logoImgName}.png`)" :alt="content.title">
        </div>
        <h4 class="additionalServiceCard__title">{{ content.title }}</h4>
        <a class="additionalServiceCard__link additionalServiceCard__link_iconed" :href="content.link" target="_blank">
          {{ cardLinkToName }}
          <Icon class="additionalServiceCard__icon" :width="24" :height="24" :name="EIconNames.ArrowUpRight" />
        </a>
      </div>
    </a>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Icon from '@/components/ui/Icon/Icon.vue'
import { IAdditionalServiceCard } from '../types'

export default defineComponent({
  components: { Icon },
  name: 'AdditionalServiceCard',
  props: {
    /**
     * Контент карточки услуг
     */
    content: {
      required: true,
      type: Object as PropType<IAdditionalServiceCard>
    }
  },

  computed: {
    cardLinkToName() {
      return this.content.link.replace(/(^\w+:|^)\/\//, '')
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'AdditionalServiceCard';
</style>
