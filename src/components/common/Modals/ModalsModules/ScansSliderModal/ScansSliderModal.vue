<template>
  <div class="scansSliderModal" @click.self="closeModal">
    <Button class="scansSliderModal__close" kind="Unstyled" @click="closeModal">
      <Icon :width="24" :height="24" :name="EIconNames.Cross" />
    </Button>
    <Swiper :navigation="options.navigation" :modules="modules">
      <SwiperSlide
        v-for="image in getPassenger.images"
        :key="image.id + image.name"
      >
        <div class="scansSliderModal__image" ref="image">
          <img :src="image.files.gfull" :alt="image.name" />
        </div>
      </SwiperSlide>
    </Swiper>
    <Button
      class="scansSliderModal__nav scansSliderModal__nav_prev"
      kind="Unstyled"
    >
      <Icon :width="24" :height="24" :name="EIconNames.ArrowLeft" />
    </Button>
    <Button
      class="scansSliderModal__nav scansSliderModal__nav_next"
      kind="Unstyled"
    >
      <Icon :width="24" :height="24" :name="EIconNames.ArrowRight" />
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Navigation } from 'swiper'
import 'swiper/modules/navigation/navigation'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  components: {
    Button,
    Icon,
    Swiper,
    SwiperSlide
  },
  name: 'ScansSliderModal',
  setup() {
    return {
      modules: [Navigation]
    }
  },

  data() {
    return {
      options: {
        navigation: {
          prevEl: '.scansSliderModal__nav_prev',
          nextEl: '.scansSliderModal__nav_next'
        }
      }
    }
  },

  methods: {
    closeModal(): void {
      this.$store.commit('mutOpenedAdditionalModalName', null)
    }
  },

  computed: {
    ...mapGetters(['getPassenger'])
  },
})
</script>

<style scoped lang="scss">
@import 'ScansSliderModal';
</style>
