<template>
  <div class="inputFile">
    <div class="fileList">
      <div class="fileListItem" v-for="(fileName, i) in inputFileValue" :key="fileName">
        <Button kind="Unstyled" type="button" class="fileListItem__btn" @click="handleOpenModal(EModalsNames.DocumentsPreviewModal, fileName.src)">
          <span class="fileListItem__fileName">{{fileName.name}}</span>
          <span>{{fileName.extension}}</span>
        </Button>
        <Button kind="Unstyled" type="button" @click="deleteItem(i)" class="fileListItem__deleteBtn">
          <Icon :width="24" :height="24" :name="EIconNames.DeleteFile"/>
        </Button>
      </div>
    </div>
    <input accept=".jpg, .jpeg, .png" ref="input" @input="handleChange" class="inputFile-none" type="file"/>
    <Button kind="Secondary" type="button" class="inputFile__btn" @click="$refs.input.click()" :isFluid="isFluid">Загрузить файл</Button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { EModalsNames } from '@/models/modals'

interface IData {
  inputValue?: File,
  inputFileValue: {
    name?: string,
    src?: string,
    extension?: string,
    id?: number,
  }[],
}

export default defineComponent({
  name: 'InputFile',
  components: {
    Button,
    Icon,
  },
  props: {
    /**
     * Кнопка занимает всю ширину
     */
    isFluid: {
      required: false,
      type: Boolean as PropType<boolean>,
      default() {
        return false
      }
    }
  },

  data(): IData {
    return {
      inputValue: undefined,
      inputFileValue: [],
    }
  },

  methods: {
    handleChange(e: Event) {
      const target = e.target as HTMLInputElement
      if (target.files && !['image/png', 'image/jpg', 'image/jpeg'].includes(target.files[0].type)) {
        return
      }
      if (target.files && target.files[0]) {
        const formData = new FormData()
        formData.append('file', target.files[0])
        this.$services.uploadImage(formData)
          .then((res) => {
            this.inputFileValue.push({
              id: res.id,
              name: res.name,
              src: res.files?.large2x,
              extension: `.${res.extension}`,
            })
            this.$emit('onFileInput', this.inputFileValue.map((file) => file.id))
          })
      }
    },
    deleteItem(index: number) {
      const input = this.$refs.input as HTMLInputElement
      input.value = ''
      this.inputFileValue.splice(index, 1)
      this.$emit('onFileInput', this.inputFileValue.map((file) => file.id))
    },
    handleOpenModal(modalNameToOpen: EModalsNames, documentImgName: string): void {
      this.$store.commit('mutOpenedAdditionalModalName', modalNameToOpen)
      this.$store.commit('mutDocumentsPreviewImgName', { src: documentImgName })
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'InputFile.scss';
</style>
