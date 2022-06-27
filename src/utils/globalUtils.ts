import { App } from 'vue'
import { IDeviceCheckUtil, deviceCheckUtil } from '@/utils/utilsModules/deviceCheckUtil'
import { IStringUtil, stringUtil } from '@/utils/utilsModules/stringUtil'
import { IStringObjectUtil, objectUtil } from '@/utils/utilsModules/objectUtil'
import { IEyesightPluginUtil, eyesightPluginUtil } from '@/utils/utilsModules/eyesightPluginUtil'

// Добавлять через '&' (ITestUtil & ITestUtil2 & ITestUtil3)
export type TGlobalUtils = (
  IDeviceCheckUtil &
  IStringUtil &
  IStringObjectUtil &
  IEyesightPluginUtil
  )

export default {
  install: (app: App): void => {
    app.config.globalProperties.$utils = {
      ...deviceCheckUtil,
      ...stringUtil,
      ...objectUtil,
      ...eyesightPluginUtil,
    } as TGlobalUtils
  }
}
