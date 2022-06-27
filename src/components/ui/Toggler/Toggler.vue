<template>
  <div class="toggler">
    <div class="toggler__bonuses">На вашем счету {{
            !this.getBonusesInfo?.balance?.active ? '0' : this.getBonusesInfo?.balance?.active
          }} баллов</div>
          <div class="toggler__wrapper">
    <tippy
      placement="bottom"
      :interactive="true"
      trigger="manual"
      ref="tippy"
      zIndex="80"
    >
      <label class="toggler__label" :for="id">
        <input
          class="toggler__input"
          v-model="isChecked"
          type="checkbox"
          :id="id"
        />
        <div class="toggler__slider"></div>
      </label>
      <template v-if="$slots.tipOnTrue" #content>
        <slot name="tipOnTrue" />
      </template>
    </tippy>
    <span class="toggler__text" v-if="label">{{ label }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TippyComponent } from 'vue-tippy'
import { mapGetters } from 'vuex'

interface IData {
  isChecked: boolean
  observer: MutationObserver | null
}

export default defineComponent({
  name: 'Toggler',
  emits: ['update:togglerModel'],
  props: {
    /**
     * Значение v-model
     */
    togglerModel: {
      required: true,
      type: Boolean as PropType<boolean>
    },
    /**
     * Текст рядом с тогглером
     */
    label: {
      required: false,
      type: String as PropType<string>,
      default: ''
    },
    /**
     * Уникальный id
     */
    id: {
      required: true,
      type: String as PropType<string>
    }
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getPassenger', 'getBonusesInfo']),
  },

  data(): IData {
    return {
      isChecked: false,
      observer: null
    }
  },

  methods: {
    toggleCheck(): void {
      this.isChecked = !this.isChecked
    },
    destroyTippy(): void {
      (this.$refs.tippy as TippyComponent).destroy()
    }
  },

  watch: {
    togglerModel() {
      this.isChecked = this.togglerModel
    },

    isChecked() {
      if (this.isChecked) {
        (this.$refs.tippy as TippyComponent).show()
      } else {
        (this.$refs.tippy as TippyComponent).hide()
      }
      this.$emit('update:togglerModel', this.isChecked)
    }
  },

  mounted() {
    this.isChecked = this.togglerModel
    const observer = new MutationObserver(() => {
      if (!this.$slots.tipOnTrue) {
        this.destroyTippy()
      }
    })
    observer.observe(this.$el, {
      childList: true,
      subtree: true
    })
    this.observer = observer
  },

  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
})
</script>

<style scoped lang="scss">
@import 'Toggler';
</style>
