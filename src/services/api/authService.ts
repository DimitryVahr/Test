import { API_ENDPOINT } from '@/constants/api'
import {
  ILogInForm,
  ILogInResponse,
  INewPasswordForm,
  INewPasswordResponse,
  IPasswordRecoveryForm,
  IPasswordRecoveryResponse,
  IRegistrationEntityForm,
  IRegistrationIndividualForm,
  IRegistrationResponse
} from '@/models/forms/authForms'
import { ERequestStatus } from '@/models/status'
import httpService from '@/services/httpService'

export interface IAuthService {
  login: (data: ILogInForm) => Promise<ILogInResponse>,
  recoveryRequest: (data: IPasswordRecoveryForm) => Promise<IPasswordRecoveryResponse>,
  recoveryReset: (data: INewPasswordForm) => Promise<INewPasswordResponse>,
  register: (data: IRegistrationIndividualForm | IRegistrationEntityForm) => Promise<IRegistrationResponse>
}

export const authService: IAuthService = {
  async login(data) {
    let response = {} as ILogInResponse

    await httpService.post<ILogInResponse>(API_ENDPOINT.login, data)
      .then((res) => {
        response = {
          status: ERequestStatus.Success,
          authKey: res.data.authKey
        }
      })
      .catch((e) => {
        response = {
          statusCode: e.response.status,
          status: ERequestStatus.Error
        }
      })

    return response
  },

  async recoveryRequest(data) {
    let response = {} as IPasswordRecoveryResponse

    await httpService.post(API_ENDPOINT.recoveryRequest, data)
      .then(() => {
        response = {
          status: ERequestStatus.Success
        }
      })
      .catch((e) => {
        response = {
          status: ERequestStatus.Error,
          statusCode: e.response.status,
        }
      })

    return response
  },

  async recoveryReset(data) {
    let response = {} as INewPasswordResponse

    await httpService.post(API_ENDPOINT.recoveryReset, data)
      .then(() => {
        response = {
          status: ERequestStatus.Success
        }
      })
      .catch((e) => {
        response = {
          statusCode: e.response.status,
          status: ERequestStatus.Error
        }
      })

    return response
  },

  async register(data) {
    let response = {} as IRegistrationResponse

    await httpService.post(API_ENDPOINT.register, data)
      .then(() => {
        response = {
          status: ERequestStatus.Success
        }
      })
      .catch((e) => {
        response = {
          statusCode: e.response.status,
          status: ERequestStatus.Error
        }
      })

    return response
  }
}
