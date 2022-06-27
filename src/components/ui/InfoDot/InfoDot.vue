<template>
  <div class="infoDot" v-tippy="content">
    <Button kind="Unstyled" class="infoDot__button">
      <Icon :name="EIconNames.Info" width="24" height="24" />
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  name: 'InfoDot',
  components: { Icon, Button },
  props: {
    content: {
      type: [String, HTMLElement],
      required: false
    }
  },
})
</script>

<style scoped lang="scss">
@import 'InfoDot';
</style>
