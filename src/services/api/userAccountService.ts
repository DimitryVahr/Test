import { AxiosRequestConfig } from 'axios'
import { API_ENDPOINT } from '@/constants/api'
import { ERequestStatus } from '@/models/status'
import {
  IChangePhoneForm,
  IChangeEmailForm,
  IDocumentTypesResponse,
  IGetStateResponse,
  IUserInfoResponse
} from '@/models/userAccount/api'
import httpService from '@/services/httpService'
import { IStringObject } from '@/models/breadcrumbs'
import { IOrganizationProfileUpdateForm, IUserProfileUpdateForm, IUserProfileUpdateResponse } from '@/models/forms/userForms'
import {
  IFlightRecord,
  IFlightRecordResponse,
  IFlightRecordsResponse
} from '@/models/userAccount/flights'
import { IApiResponse } from '@/models/api'

export interface IUserAccountService {
  getUserInfo: (config: AxiosRequestConfig) => Promise<IUserInfoResponse>
  getStates: () => Promise<IGetStateResponse>
  getDocumentTypes: () => Promise<IDocumentTypesResponse>
  updateProfile: (data: IUserProfileUpdateForm | IOrganizationProfileUpdateForm, config: AxiosRequestConfig) => Promise<IUserProfileUpdateResponse>
  editProfile: (data: IUserProfileUpdateForm | IOrganizationProfileUpdateForm, config: AxiosRequestConfig) => Promise<IUserProfileUpdateResponse>
  getFlightRecords: (config: AxiosRequestConfig) => Promise<IFlightRecordsResponse>
  getFlightRecord: (recordId: number, config: AxiosRequestConfig) => Promise<IFlightRecordResponse>
  changePhone: (data: IChangePhoneForm, config: AxiosRequestConfig) => Promise<IApiResponse>,
  changeEmail: (data: IChangeEmailForm, config: AxiosRequestConfig) => Promise<IApiResponse>,
}

export const userAccountService: IUserAccountService = {
  async getUserInfo(config) {

    let response = {} as IUserInfoResponse

    await httpService.get<IUserInfoResponse>(API_ENDPOINT.getUserInfo, config)
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

  async getStates() {

    let response = {} as IGetStateResponse

    await httpService.get<IStringObject>(API_ENDPOINT.getStates)
      .then((res) => {
        response = {
          states: res.data,
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

  async getDocumentTypes() {

    let response = {} as IDocumentTypesResponse

    await httpService.get<IStringObject>(API_ENDPOINT.getDocumentTypes)
      .then((res) => {
        response = {
          docTypes: res.data,
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

  async updateProfile(data, config) {

    let response = {} as IUserProfileUpdateResponse

    await httpService.put<IUserProfileUpdateResponse>(API_ENDPOINT.updateProfile, data, config)
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

  async editProfile(data, config) {

    let response = {} as IUserProfileUpdateResponse

    await httpService.post<IUserProfileUpdateResponse>(API_ENDPOINT.editProfile, data, config)
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

  async getFlightRecords(config) {

    let response = {} as IFlightRecordsResponse

    await httpService.get<IFlightRecord[]>(API_ENDPOINT.flightRecords, config)
      .then((res) => {
        response = {
          flightRecords: res.data,
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

  async getFlightRecord(recordId, config) {

    let response = {} as IFlightRecordResponse

    await httpService.get<IFlightRecord>(`${ API_ENDPOINT.flightRecord }?id=${ recordId }`, config)
      .then((res) => {
        response = {
          flightRecord: res.data,
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

  async changePhone(data, config) {
    let response = {} as IApiResponse

    await httpService.post(API_ENDPOINT.changePhone, data, config)
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

  async changeEmail(data, config) {
    let response = {} as IApiResponse

    await httpService.post(API_ENDPOINT.changeEmail, data, config)
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
