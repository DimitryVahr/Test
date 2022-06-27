<template>
  <CommonLayout>
    <Contacts/>
  </CommonLayout>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Contacts from '@common/Contacts/Contacts.vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'

export default defineComponent({
  name: 'ContactsCompany',
  components: {
    CommonLayout,
    Contacts,
  }
})
</script>
