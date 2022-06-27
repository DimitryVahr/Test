import { API_ENDPOINT, API_TOKEN } from '@/constants/api'
import { IApiResponse } from '@/models/api'
import { ERequestStatus } from '@/models/status'
import httpService from '@/services/httpService'

export interface IWeatherData {
  q: string,
}

export interface IWeatherResponse extends IApiResponse {
  main?: {
    temp: number,
  },
  weather?: {
    main: string,
  }[],
  dt?: number,
}

export interface IWeatherService {
  getWeather: (data: IWeatherData) => Promise<IWeatherResponse>,
}

export const weatherService: IWeatherService = {
  async getWeather(data) {

    let response = {} as IWeatherResponse

    await httpService.get<IWeatherResponse>(API_ENDPOINT.getWeather, {
      params: {
        ...data,
        lang: 'ru',
        units: 'metric',
        appid: API_TOKEN.weather
      }
    })
      .then((e) => {
        response = {
          main: e.data.main,
          weather: e.data.weather,
          dt: e.data.dt,
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
