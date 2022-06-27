import { API_ENDPOINT, API_TOKEN } from '@/constants/api'
import {
  ISuggestionsBankData,
  ISuggestionsBankResponse,
  ISuggestionsPartyData,
  ISuggestionsPartyResponse
} from '@/models/forms/authForms'
import { ERequestStatus } from '@/models/status'
import httpService from '@/services/httpService'

export interface ISuggestionsService {
  suggestParty: (data: ISuggestionsPartyData) => Promise<ISuggestionsPartyResponse>
  suggestBank: (data: ISuggestionsBankData) => Promise<ISuggestionsBankResponse>
}

export const suggestionsService: ISuggestionsService = {
  async suggestParty(data) {
    let response = {} as ISuggestionsPartyResponse

    await httpService.post<ISuggestionsPartyResponse>(API_ENDPOINT.suggestParty, data, {
      headers: {
        Authorization: API_TOKEN.suggestions
      }
    })
      .then((res) => {
        response = {
          suggestions: res.data.suggestions,
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

  async suggestBank(data) {
    let response = {} as ISuggestionsBankResponse

    await httpService.post<ISuggestionsBankResponse>(API_ENDPOINT.suggestBank, data, {
      headers: {
        Authorization: API_TOKEN.suggestions
      }
    })
      .then((res) => {
        response = {
          suggestions: res.data.suggestions,
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
}
