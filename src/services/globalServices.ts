import { App } from 'vue'
import { authService, IAuthService } from './api/authService'
import { IFileService, fileService } from './api/fileService'
import { IMessageService, messageService } from './api/messagesService'
import { ISuggestionsService, suggestionsService } from './api/suggestionsService'
import { IPasswordService, passwordService } from '@/services/api/passwordService'
import { IUserAccountService, userAccountService } from './api/userAccountService'
import { IWeatherService, weatherService } from './api/weatherService'
import { bonusesService, IBonusesService } from './api/bonusesService'
import { IPassengersService, passengersService } from './api/passengersService'
import {
  flightRegistrationService,
  IFlightRegistrationService
} from '@/services/api/flightRegistrationService'

// Добавлять через '&' (IService1 & IService2 & IService3)
export type TGlobalServices = (
  IMessageService &
  IAuthService &
  ISuggestionsService &
  IFileService &
  IPasswordService &
  IUserAccountService &
  IWeatherService &
  IBonusesService &
  IPassengersService &
  IFlightRegistrationService
  )

export default {
  install: (app: App): void => {
    app.config.globalProperties.$services = {
      ...messageService,
      ...authService,
      ...suggestionsService,
      ...fileService,
      ...passwordService,
      ...userAccountService,
      ...weatherService,
      ...bonusesService,
      ...passengersService,
      ...flightRegistrationService
    } as TGlobalServices
  }
}
