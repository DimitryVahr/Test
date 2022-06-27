import { EIconNames } from '@ui/Icon/types'
import { EModalsNames } from '@/models/modals'
import {
  FormRegExps,
  IFormRegExps,
  IMaskRegExps,
  MaskRegExps
} from '@/constants/regExps'
import { ErrorMessages, IErrorMessages } from '@/constants/errorMessages'
import { ERequestStatus } from '@/models/status'

export interface IGlobalMixinData {
  EIconNames: typeof EIconNames
  EModalsNames: typeof EModalsNames
  MaskRegExps: IMaskRegExps
  FormRegExps: IFormRegExps
  ErrorMessages: IErrorMessages
  ERequestStatus: typeof ERequestStatus
}

export const globalMixin = {
  data(): IGlobalMixinData {
    return {
      EIconNames,
      EModalsNames,
      MaskRegExps,
      FormRegExps,
      ErrorMessages,
      ERequestStatus,
    }
  },
}
