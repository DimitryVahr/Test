<template>
  <div class="modal">
    <div class="modal__bg-image"
         :style="{backgroundImage: `url(${require('./ModalImages/' + modalImage + '.png')})`}"/>
    <div class="modal__content-wrapper">
      <div class="modal__content">
        <slot/>
      </div>
    </div>
    <Button
      kind="Unstyled"
      className="modal__close-btn"
      @click="closeModal"
    >
      <Icon
        :width="24"
        :height="24"
        :name="EIconNames.Cross"
      />
    </Button>
    <slot name="outer-content"/>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'

type TModalImage = (
  'Winter' |
  'login' |
  'MountainWaterfall' |
  'Snowmobile' |
  'SunnySnowyMountain' |
  'registration' |
  'MoutainLake' |
  'profileUpdateSendMessage'
  )

export default defineComponent({
  name: 'ModalBase',
  components: {
    Button,
    Icon
  },
  props: {
    /**
     * Картинка модалки
     */
    modalImage: {
      required: true,
      type: String as PropType<TModalImage>
    }
  },
  data: () => {
    return {}
  },
  methods: {
    closeModal(): void {
      this.$store.commit('mutOpenedModalName', null)
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'ModalBase';
</style>
