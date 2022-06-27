import { IApiResponse } from '@/models/api'

export interface ILogInForm {
  login: string,
  password: string,
}

export interface ILogInResponse extends IApiResponse {
  authKey?: string,
  statusCode?: number,
}

export interface IPasswordRecoveryForm {
  login: string,
}

export type IPasswordRecoveryResponse = IApiResponse & {
  statusCode?: number,
}

export interface INewPasswordForm {
  code: string,
  password: string,
  userId: string,
}

export type INewPasswordResponse = IApiResponse & {
  statusCode?: number,
}

export interface ISuggestionsPartyData {
  query: string,
  count: number,
}

export interface ISuggestionsBankData {
  query: string,
  count: number,
}

export interface ISuggestionData {
  [index: string]: any,
  fullTitle: string,
  ogrn: string,
  bic: string,
  inn: string,
  correspondent_account: string,
  kpp: string,
  address: {
    value: string,
  },
  addressPost: string,
}

export interface ISuggestion {
  value: string,
  data: ISuggestionData
}

export interface ISuggestionsPartyResponse extends IApiResponse {
  suggestions?: ISuggestion[]
}

export interface ISuggestionsBankResponse extends IApiResponse {
  suggestions?: ISuggestion[]
}

export interface IRegistrationIndividualForm {
  email: string,
  name: string,
  password: string,
  phone: string,
  surname: string,
  title: string,
  type: 1 | 2,
}

export interface IRegistrationEntityForm extends IRegistrationIndividualForm {
  info: {
    account: string,
    address: string,
    addressPost: string,
    bank: string,
    bic: string,
    correspondent_account: string,
    fullTitle: string,
    inn: string,
    kpp: string,
    ogrn: string,
  }
}

export type IRegistrationResponse = IApiResponse & {
  statusCode?: number,
}
