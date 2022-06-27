<template>
    <div class='mainServiceCard'>
      <router-link class="mainServiceCard__link" :to="{ name: content.routeName ? content.routeName : 'Main' }">
        <div class="mainServiceCard__content">
          <h3 class="h3_large">{{ content.title }}</h3>
          <div class="mainServiceCard__description">
            <p>{{ content.description }}</p>
            <div class="mainServiceCard__icon">
              <Icon :width="24" :height="24" :name="EIconNames.ArrowRight" />
            </div>
          </div>
        </div>
      </router-link>
      <div class="mainServiceCardImage" :style="!getIsImagesHidden ? `background-image: url('${require('@/assets/img/main/' + content.posterImgName + '.jpg')}') !important` : ''"></div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { mapGetters } from 'vuex'
import Icon from '@ui/Icon/Icon.vue'
import { IMainServiceCard } from '../types'

export default defineComponent({
  components: { Icon },
  name: 'MainServiceCard',
  props: {
    /**
     * Контент карточки услуг
     */
    content: {
      required: true,
      type: Object as PropType<IMainServiceCard>
    }
  },

  computed: {
    ...mapGetters(['getIsImagesHidden']),
  },
})
</script>

<style scoped lang='scss'>
@import 'MainServiceCard';
</style>
