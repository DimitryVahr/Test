<template>
  <CommonLayout>
    <MainPage/>
  </CommonLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Main from '@common/Main/Main.vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'

export default defineComponent({
  name: 'Main',
  components: {
    CommonLayout,
    MainPage: Main
  }
})
</script>
