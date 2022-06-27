import { AxiosRequestConfig } from 'axios'
import { API_ENDPOINT } from '@/constants/api'
import { ERequestStatus } from '@/models/status'
import {
  IBonusesTransactionsResponse,
  IBonusesTransactionsResponseData,
  ICheckBonusData,
  ICheckBonusResponse,
  IUserBonuses,
  IUserBonusesResponse,
} from '@/models/userAccount/api'
import httpService from '@/services/httpService'

export interface IBonusesService {
  getBonusesTransactions:(config: AxiosRequestConfig) => Promise<IBonusesTransactionsResponse>
  checkBonusCard: (data: ICheckBonusData) => Promise<ICheckBonusResponse>
  getBonus: (config: AxiosRequestConfig) => Promise<IUserBonusesResponse>
}

export const bonusesService: IBonusesService = {
  async getBonusesTransactions(config) {
    let response = {} as IBonusesTransactionsResponse
    await httpService.get<IBonusesTransactionsResponseData>(API_ENDPOINT.bonusesTransaction, config)
      .then((res) => {
        response = {
          bonuses: res.data.data,
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

  async checkBonusCard(data) {
    let response = {} as ICheckBonusResponse
    await httpService.get<boolean>(`${API_ENDPOINT.checkBonus}?firstName=${data.firstName}&lastName=${data.lastName}&patronymic=${data.patronymic}&birthday=${data.birthday}&bonusCard=${data.bonusCard}`)
      .then((res) => {
        response = {
          isCorrect: res.data,
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

  async getBonus(config) {

    let response = {} as IUserBonusesResponse

    await httpService.get<IUserBonuses>(API_ENDPOINT.getBonus, config)
      .then((res) => {
        response = {
          ...res.data,
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
