import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import store from '@/store/rootStore'

const axiosInit = (): AxiosInstance => {
  const defaultConfig: AxiosRequestConfig = {
    baseURL: 'https://vityaz-aero.nutnetdev.ru',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  const axiosInstanceWithConfig = axios.create(defaultConfig)

  axiosInstanceWithConfig.interceptors.request.use(
    (config) => {
      return {
        ...config,
      }
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  axiosInstanceWithConfig.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Отлавливаем серверные ошибки и выводим сообщение об этом
      if (error.response.status === 500) {
        store.commit('mutAlertText', 'Внутренняя ошибка сервера, попробуйте позже')
      }
      return Promise.reject(error)
    },
  )

  return axiosInstanceWithConfig
}

export const axiosInstance = axiosInit()

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
}
