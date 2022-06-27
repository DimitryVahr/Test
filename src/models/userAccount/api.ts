import { IApiResponse } from '../api'
import { IStringObject } from '@/models/breadcrumbs'

export interface IUserInfoResponse extends IApiResponse {
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
  sex?: 0 | 1,
  title?: string,
  surname?: string,
  type?: 1 | 2,
  username?: string
}

export interface IUserBonuses {
  balance?: {
    active: number,
    plan: number
  },
  holder?: {
    firstName: string,
    lastName: string,
    patronymic: string
  },
  number?: string,
  is_available_paying?: boolean
}

export interface IUserBonusesResponse extends IApiResponse {
  data?: IUserBonuses
}

export interface IGetStateResponse extends IApiResponse {
  states?: IStringObject
}

export interface IDocumentTypesResponse extends IApiResponse {
  docTypes?: IStringObject
}

export interface IBonusesTransactionItem {
  amount: number,
  date: string,
  itinerary: {
    from: string,
    id: number,
    to: string
  },
  passenger: {
    birthday: string,
    firstName: string,
    lastName: string,
    patronymic: string
  },
  status: {
    alias: string,
    id: number,
    title: string
  },
  type: string
}

export interface IBonusesTransactionsResponseData {
  data?: IBonusesTransactionItem[]
}

export interface IBonusesTransactionsResponse extends IApiResponse {
  bonuses?: IBonusesTransactionItem[],
}

export interface IPassengerInfo {

  id: number,
  type: string,
  bonusStats: [
    {
      amount: number,
      date: string,
      itinerary: {
        from: string,
        id: number,
        to: string
      },
      passenger: {
        birthday: string,
        firstName: string,
        lastName: string,
        patronymic: string
      },
      status: {
        alias: string,
        id: number,
        title: string
      },
      title: string
    }
  ],
  firstName: string,
  lastName: string,
  patronymic: string,
  sex: 0|1,
  state: string,
  birthday: string,
  phone: string,
  email: string,
  documentType: number,
  documentNumber: string,
  isLocal: number,
  isUserProfile: number,
  bonusCard: string,
  imagesIds: [
    string
  ],
  userId: number,
  images: [
    string
  ]
}

export interface IPassengersInfo {
  total: number,
  last_page: number,
  current_page: number,
  items_count: number,
  data: IPassengerInfo[]
}

export interface IPassengersInfoResponse extends IApiResponse {
  passengers?: IPassengersInfo,
}

export interface IPassengersInfoResponseData extends IApiResponse {
  data?: IPassengersInfo,
}

export interface IChangePhoneForm {
  phone: string
}

export interface IChangeEmailForm {
  isMobile: boolean,
  newEmail: string
}

export interface ICheckBonusData {
  firstName: string,
  lastName: string,
  patronymic: string,
  birthday: string,
  bonusCard: string,
}

export interface ICheckBonusResponse extends IApiResponse {
  isCorrect?: boolean,
}

export interface IPassenger {
  birthday: string,
  bonusCard: string,
  documentNumber: string,
  documentType: number,
  email: string,
  firstName: string,
  id: number,
  imagesIds: [
    string
  ],
  images: [
    string
  ],
  isLocal: number,
  isUserProfile: number,
  lastName: string,
  patronymic: string,
  phone: string,
  sex: 0|1,
  state: string,
  type: string,
  userId: number,
  bonusStats: [
    {
      amount: number,
      date: string,
      itinerary: {
        from: string,
        id: number,
        to: string
      },
      passenger: {
        birthday: string,
        firstName: string,
        lastName: string,
        patronymic: string
      },
      status: {
        alias: string,
        id: number,
        title: string
      },
      title: string
    }
  ]
}
export interface IPassengerResponse extends IApiResponse {
  data?:IPassenger
}

export type IDeletePassengerResponse = IApiResponse
