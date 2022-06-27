<template>
  <div class='documentsGroup' :class="{documentsGroup_turnover: group.documentsImages.length > 1}">
    <h3 class="h3 documentsGroup__title">{{ group.title }}</h3>
    <span class="documentsGroup__date">От {{ group.date }}</span>
    <div class="documentsGroup__images">
      <div class="documentsGroup__image" v-for="(img, i) in group.documentsImages" :key="img.imgName + i">
        <img :src="require(`@/assets/img/aboutCompany/${img.imgName}.jpg`)" :alt="img.alt">
        <Button kind="Unstyled" class="documentsGroup__zoom" @click="handleModalOpen(EModalsNames.DocumentsPreviewModal, img.imgName)">
          <Icon :width="24" :height="24" :name="EIconNames.ZoomIn" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Icon from '@/components/ui/Icon/Icon.vue'
import { IDocumentsGroup } from '../types'
import Button from '@/components/ui/Button/Button.vue'
import { EModalsNames } from '@/models/modals'

export default defineComponent({
  components: { Icon, Button },
  name: 'DocumentsGroup',
  props: {
    /**
     * Название, дата и картинки документов
     */
    group: {
      required: true,
      type: Object as PropType<IDocumentsGroup>
    }
  },

  methods: {
    handleModalOpen(modalNameToOpen: EModalsNames, documentImgName: string): void {
      this.$store.commit('mutOpenedAdditionalModalName', modalNameToOpen)
      this.$store.commit('mutDocumentsPreviewImgName', { imgName: documentImgName })
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'DocumentsGroup';
</style>
