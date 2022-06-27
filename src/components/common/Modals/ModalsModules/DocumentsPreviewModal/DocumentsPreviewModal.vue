<template>
  <div class='documentsPreviewModal' @click.self="closeModal">
    <Button class="documentsPreviewModal__close" kind="Unstyled" @click="closeModal">
      <Icon :width="24" :height="24" :name="EIconNames.Cross" />
    </Button>
    <div class="documentsPreviewModal__image" v-if="getDocumentsPreviewImgName">
      <img :src="
        getDocumentsPreviewImgName.imgName
        ? require(`@/assets/img/aboutCompany/${getDocumentsPreviewImgName.imgName}.jpg`)
        : getDocumentsPreviewImgName.src" alt="Превью документа">
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  components: { Button, Icon },
  name: 'DocumentsPreviewModal',

  methods: {
    closeModal(): void {
      this.$store.commit('mutOpenedAdditionalModalName', null)
    }
  },

  computed: {
    ...mapGetters([
      'getDocumentsPreviewImgName',
    ]),
  },
})
</script>

<style scoped lang='scss'>
@import 'DocumentsPreviewModal';
</style>
