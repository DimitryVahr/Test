<template>
  <Select
    :isReadOnly="false"
    :items="selectItems"
    :modelReturnType="'value'"
    :useInputSort="true"
    :label="sectionType === 'from' ? 'Вылет' : 'Прилёт'"
    :isError="isError"
    type="white"
    :disabled="disabled"
    @onSelect="handleSelectChange"
  />
</template>

<script lang='ts'>
import { defineComponent, nextTick, PropType } from 'vue'
import Select from '@ui/Select/Select.vue'
import { mapGetters } from 'vuex'
import { ISelectItem } from '@/models/breadcrumbs'
import { IFormattedSection } from '@/models/flightRegistration/flightReg'
import { IDestination } from '@/models/flightRegistration/api'

interface IData {
  selectedSectionId?: number,
  selectItems: ISelectItem[],
}

export default defineComponent({
  name: 'SectionsSelect',
  emits: ['update:selectModel'],
  components: { Select },
  props: {
    sectionType: {
      type: String as PropType<'from' | 'to'>,
      required: true
    },
    isError: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false
    },
    /**
     * При изменении значения этого пропса, произойдет сортировка по пропсу sortMode
     */
    sortValue: {
      type: Number as PropType<number | null>,
      required: false,
    },
    /**
     * Определяет как нужно сортировать данные в зависимости от присоединенного селекта.
     * К примеру, если в селекте вылета выбрана Ивашка, то в режиме 'avaliable' в селекте прилёта
     * будут показаны только точки прилета из Ивашки, а в режиме 'exclude' - все точки, кроме Ивашки
     */
    sortMode: {
      type: String as PropType<'available' | 'exclude'>,
      required: false,
      default: 'available'
    },
    selectModel: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    ...mapGetters([
      'getAuthConfig',
      'getSections',
      'getSectionRecord'
    ]),
  },
  watch: {
    getSections: {
      handler(newValue: IFormattedSection[]) {
        this.loadSections(newValue)
      },
      immediate: true
    },
    sortValue(newValue: number, oldValue: number) {

      if (!newValue) {
        this.selectItems = [] as ISelectItem[]
        nextTick(() => {
          this.loadSections(this.getSections)
        })

      } else if (this.sortMode === 'available' && newValue !== oldValue) {
        const sortedSection = [] as ISelectItem[]
        this.getSections.forEach((section: IFormattedSection) => {
          if (newValue === section.id) {
            section.destinations.forEach((destination: IDestination) => {
              if (destination.placeTo) {
                sortedSection.push({
                  label: destination.placeTo.title,
                  value: destination.placeTo.id,
                })
              }
            })
          }
        })
        this.selectItems = sortedSection

      } else if (this.sortMode === 'exclude') {
        const sortedSection = [] as ISelectItem[]
        this.getSections.forEach((section: IFormattedSection) => {
          if (newValue !== section.id) {
            if (section.id) {
              sortedSection.push({
                label: section.title,
                value: section.id,
              })
            }
          }
        })
        this.selectItems = sortedSection
      }
    },

    selectModel() {
      setTimeout(() => {
        this.selectedSectionId = this.selectModel
        this.selectItems = this.selectItems.map((item) => {
          return {
            ...item,
            selected: this.selectedSectionId === item.value
          }
        })
      }, 1)
    }
  },

  data: (): IData => {
    return {
      selectedSectionId: -1,
      selectItems: [] as ISelectItem[],
    }
  },

  methods: {
    handleSelectChange(id: number | null): void {
      if (id === null) return
      this.$store.commit('mutSectionRecord', {
        [`${ this.sectionType }Id`]: id
      })
      this.$emit('update:selectModel', id)
    },
    loadSections(newValue: IFormattedSection[]) {
      const items = [] as ISelectItem[]
      newValue.forEach((section: IFormattedSection) => {
        items.push({
          label: section.title,
          value: section.id
        })
      })
      this.selectItems = items
    }
  },

  mounted() {
    this.selectedSectionId = this.selectModel
  }
})
</script>

<style scoped lang='scss'>
@import 'SectionsSelect';
</style>
