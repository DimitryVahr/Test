<template>
  <CommonLayout>
    <UserAccount />
  </CommonLayout>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import UserAccount from '@common/UserAccount/UserAccount.vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'

export default defineComponent({
  components: { CommonLayout, UserAccount },
  name: 'Account',
})
</script>
