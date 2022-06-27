import { createApp } from 'vue'
import Maska from 'maska'
import vClickOutside from 'click-outside-vue3'
import VueTippy from 'vue-tippy'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/rootStore'
import { globalMixin } from '@/mixins/globalMixin'
import globalUtils from '@/utils/globalUtils'
import globalServices from '@/services/globalServices'
import { tippyOptions } from '@/directives/tippy'

createApp(App)
  .use(store)
  .use(router)
  .use(Maska)
  .use(globalUtils)
  .use(globalServices)
  .use(vClickOutside)
  .mixin(globalMixin)
  .use(VueTippy, tippyOptions)
  .mount('#app')
