declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module 'maska'
declare module 'vue-yandex-maps'
declare module 'swiper'
declare module 'moment'
declare module 'click-outside-vue3'
declare module 'file-saver'
