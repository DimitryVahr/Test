import { AxiosRequestConfig } from 'axios'
import {
  IChangePasswordForm,
  TChangePasswordResponse,
  TCheckPasswordResponse
} from '@/models/forms/passwordForms'
import httpService from '@/services/httpService'
import { API_ENDPOINT } from '@/constants/api'
import { ERequestStatus } from '@/models/status'

export interface IPasswordService {
  checkPassword: (data: IChangePasswordForm, config: AxiosRequestConfig) => Promise<TCheckPasswordResponse>,
  changePassword: (data: IChangePasswordForm, config: AxiosRequestConfig) => Promise<TChangePasswordResponse>,
}

export const passwordService: IPasswordService = {
  async checkPassword(data, config) {

    let response = {} as TCheckPasswordResponse

    await httpService.post(API_ENDPOINT.checkPassword, data, config)
      .then(() => {
        response = {
          status: ERequestStatus.Success
        }
      })
      .catch(() => {
        response = {
          status: ERequestStatus.Error
        }
      })

    return response
  },
  async changePassword(data, config) {

    let response = {} as TChangePasswordResponse

    await httpService.post(API_ENDPOINT.changePassword, data, config)
      .then(() => {
        response = {
          status: ERequestStatus.Success
        }
      })
      .catch(() => {
        response = {
          status: ERequestStatus.Error
        }
      })

    return response
  }
}
