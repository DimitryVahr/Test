import { IApiResponse } from '@/models/api'

export interface ISendMessageForm {
  receiver?: string,
  email: string,
  name: string,
  theme: string,
  text: string,
}

export type ISendMessageResponse = IApiResponse
