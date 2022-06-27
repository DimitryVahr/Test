import { IApiResponse } from '@/models/api'

export interface IUserProfileUpdateForm {
  surname: string,
  name: string,
  patronymic: string,
  email: string,
  imagesIds: number[],
  phone: string,
  sex: number,
  birthday: string,
  state: string,
  documentType: string,
  documentNumber: string,
  isLocal: boolean | 0 | 1,
  title: string | null
}

export interface IOrganizationProfileUpdateForm {
  info: {
    account: string,
    address: string,
    addressPost: string,
    bank: string,
    bic: string,
    inn: string,
    kpp: string,
    ogrn: string,
    correspondent_account: string,
    fullTitle: string,
  }
}

export interface IUserProfileUpdateResponse extends IApiResponse {
  address?: string,
  birthday?: string,
  bonus?: string,
  checked?: boolean,
  document?: number,
  documentNum?: string,
  email?: string,
  emailSubscription?: boolean,
  id?: number,
  isGuest?: boolean,
  isProfileFilled?: boolean,
  name?: string,
  password?: string,
  patronymic?: string,
  phone?: string,
  sex?: number,
  title?: string,
  town?: string,
  townId?: string,
  surname?: string,
  type?: number,
  username?: string
}

export interface IUserFullInfo {
  address: string,
  birthday: string,
  bonus: string,
  checked: boolean,
  document: number,
  documentNum: string,
  email: string,
  emailSubscription: boolean,
  id: number,
  isGuest: boolean,
  isProfileFilled: boolean,
  name: string,
  password: string,
  patronymic: string,
  phone: string,
  sex: number,
  title: string,
  town: string,
  townId: string,
  surname: string,
  type: number,
  username: string
}
