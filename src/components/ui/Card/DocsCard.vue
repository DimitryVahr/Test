<template>
  <a :href='href' class="docsCard" >
    <div>
      <Icon class="docsCard__icon" :width="20" :height="20" :name="EIconNames.Download"/>
    </div>
    <p>
      {{text}}
      <span class="docsCard__size">{{docSize}}</span>
    </p>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  name: 'DocsCard',
  props: {
    /**
     * Текст карточки
     */
    text: {
      required: false,
      type: String
    },
    /**
     * Путь к документу
     */
    href: {
      required: false,
      type: String
    },
    /**
     * Размер документа
     */
    docSize: {
      required: false,
      type: String
    }
  },
  components: {
    Icon,
  },
})
</script>

<style scoped lang='scss'>
@import 'DocsCard.scss';
</style>
