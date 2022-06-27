<template>
  <div class="additionalInfoCard">
    <div class="additionalInfoCard__icon">
      <Icon :width="80" :height="80" :name="EIconNames[info.icon]" />
    </div>
    <h2 class="h2">{{ info.title }}</h2>
    <p class="additionalInfoCard__text" v-for="(paragraph, i) in info.text" :key="i">{{ paragraph }}</p>
    <router-link class="additionalInfoCard__button" v-if="info.button" :to="{name:'FlightRegistration'}">Записаться на рейс</router-link >
    <a class="additionalInfoCard__link" :href="info.link.href" target="_blank" v-if="info.link?.href">{{ info.link.text }}</a>
    <router-link class="additionalInfoCard__link" :to="{name:info.link.routeName}" v-if="info.link?.routeName">{{ info.link.text }}</router-link>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Icon from '@ui/Icon/Icon.vue'
import { IAdditionalInfoCard } from '../types'

export default defineComponent({
  components: { Icon },
  name: 'AdditionalInfoCard',
  props: {
    /**
      * Информация в карточке
      */
    info: {
      required: true,
      type: Object as PropType<IAdditionalInfoCard>
    },
  }
})
</script>

<style scoped lang='scss'>
@import 'AdditionalInfoCard';
</style>
