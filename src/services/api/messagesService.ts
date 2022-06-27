import { API_ENDPOINT } from '@/constants/api'
import { ISendMessageForm, ISendMessageResponse } from '@/models/forms/messageForms'
import { ERequestStatus } from '@/models/status'
import httpService from '@/services/httpService'

export interface IMessageService {
  contact: (data: ISendMessageForm) => Promise<ISendMessageResponse>,
}

export const messageService: IMessageService = {
  async contact(data) {

    let response = {} as ISendMessageResponse

    await httpService.post(API_ENDPOINT.contact, data)
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
