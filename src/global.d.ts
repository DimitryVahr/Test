import { Store } from 'vuex'
import { IGlobalMixinData } from '@/mixins/globalMixin'
import { TGlobalUtils } from '@/utils/globalUtils'
import { TGlobalServices } from '@/services/globalServices'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends IGlobalMixinData{
    $store: Store<State>
    $utils: TGlobalUtils
    $services: TGlobalServices
  }
}
