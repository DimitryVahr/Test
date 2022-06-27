import { AxiosRequestConfig } from 'axios'
import httpService from '@/services/httpService'
import { API_ENDPOINT } from '@/constants/api'
import { ERequestStatus } from '@/models/status'
import {
  IAvailableCapacity,
  IAvailableCapacityBody,
  IAvailableCapacityResponse,
  IFlightRegSubmit,
  IGetSectionsResponse,
  IOrderHelicopter,
  IOrderHelicopterResponse,
  ISections
} from '@/models/flightRegistration/api'
import { IApiResponse } from '@/models/api'

export interface IFlightRegistrationService {
  getSections: (config: AxiosRequestConfig) => Promise<IGetSectionsResponse>,
  getAircraftInfo: (body: IAvailableCapacityBody) => Promise<IAvailableCapacityResponse>,
  submitFlight: (body: IFlightRegSubmit) => Promise<IApiResponse>,
  orderHelicopter: (config: AxiosRequestConfig | undefined, body: IOrderHelicopter) => Promise<IOrderHelicopterResponse>
}

export const flightRegistrationService: IFlightRegistrationService = {
  async getSections(config) {

    let response = {} as IGetSectionsResponse

    await httpService.get<ISections>(API_ENDPOINT.getSections, config)
      .then((res) => {
        response = {
          status: ERequestStatus.Success,
          sections: res.data
        }
      })
      .catch(() => {
        response = {
          status: ERequestStatus.Error
        }
      })

    return response
  },

  async getAircraftInfo(body) {
    let response = {} as IAvailableCapacityResponse

    await httpService.post<IAvailableCapacity>(API_ENDPOINT.getAvailableCapacity, body)
      .then((res) => {
        response = {
          status: ERequestStatus.Success,
          data: res.data
        }
      })
      .catch(() => {
        response = {
          status: ERequestStatus.Error
        }
      })

    return response
  },

  async submitFlight(body) {
    let response = {} as IApiResponse

    await httpService.post<IFlightRegSubmit>(API_ENDPOINT.submitFlight, body)
      .then(() => {
        response = {
          status: ERequestStatus.Success,
        }
      })
      .catch(() => {
        response = {
          status: ERequestStatus.Error
        }
      })

    return response
  },

  async orderHelicopter(config, body) {
    let response = {} as IOrderHelicopterResponse

    await httpService.post<IOrderHelicopterResponse>(API_ENDPOINT.orderHelicopter, body, config)
      .then((res) => {
        response = {
          status: ERequestStatus.Success,
          user: res.data.user
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
