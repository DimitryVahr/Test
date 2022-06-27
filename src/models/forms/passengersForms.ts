import { IApiResponse } from '@/models/api'

export interface IManipulatePassengerForm {
  firstName: string,
  lastName: string,
  patronymic: string,
  sex: 1 | 0,
  state: string,
  birthday: string,
  phone: string,
  documentType: number,
  documentNumber: string,
  isLocal: boolean | 0 | 1,
  isUserProfile: boolean | 0 | 1,
  bonusCard: string,
  imagesIds: number[],
}

export type IManipulatePassengerResponse = IApiResponse
