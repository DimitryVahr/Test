import { IApiResponse } from '@/models/api'

export interface IChangePasswordForm {
  password: string,
  newPassword: string
}

export type TCheckPasswordResponse = IApiResponse
export type TChangePasswordResponse = IApiResponse
