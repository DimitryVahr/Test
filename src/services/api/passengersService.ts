import { AxiosRequestConfig } from 'axios'
import { API_ENDPOINT } from '@/constants/api'
import { ERequestStatus } from '@/models/status'
import {
  IPassengersInfoResponse, IPassengersInfoResponseData, IPassengerResponse, IPassenger, IDeletePassengerResponse
} from '@/models/userAccount/api'
import httpService from '@/services/httpService'
import { IManipulatePassengerForm, IManipulatePassengerResponse } from '@/models/forms/passengersForms'

export interface IPassengersService {
  getPassengersInfo:(config: AxiosRequestConfig) => Promise<IPassengersInfoResponse>
  createPassenger: (data: IManipulatePassengerForm, config: AxiosRequestConfig) => Promise<IManipulatePassengerResponse>
  getPassengerInfo: (config: AxiosRequestConfig, id: number) => Promise<IPassengerResponse>
  changePassenger: (data: IManipulatePassengerForm, id: number, config: AxiosRequestConfig) => Promise<IManipulatePassengerResponse>
  DeletePassenger:(id:number, config: AxiosRequestConfig) =>Promise<IDeletePassengerResponse>
}

export const passengersService: IPassengersService = {
  async getPassengersInfo(config) {
    let response = {} as IPassengersInfoResponse
    await httpService.get<IPassengersInfoResponseData>(API_ENDPOINT.passengersInfo, config)
      .then((res) => {
        response = {
          passengers: res.data.data,
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

  async createPassenger(data, config) {
    let response = {} as IManipulatePassengerResponse
    await httpService.post<IManipulatePassengerResponse>(API_ENDPOINT.createPassenger, data, config)
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

  async getPassengerInfo(config, id) {
    let response = {} as IPassengerResponse
    await httpService.get<IPassenger>(`${API_ENDPOINT.passenger}?id=${id}`, config)
      .then((res) => {
        response = {
          data: res.data,
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

  async changePassenger(data, id, config) {
    let response = {} as IManipulatePassengerResponse
    await httpService.put<IManipulatePassengerResponse>(`${API_ENDPOINT.updatePassenger}?id=${id}`, data, config)
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

  async DeletePassenger(id, config) {
    let response = {} as IDeletePassengerResponse
    await httpService.get<IDeletePassengerResponse>(`${API_ENDPOINT.deletePassenger}?id=${id}`, config)
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
}
