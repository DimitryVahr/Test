import { API_ENDPOINT } from '@/constants/api'
import { IApiResponse } from '@/models/api'
import { ERequestStatus } from '@/models/status'
import httpService from '@/services/httpService'

interface IUploadImageResponse extends IApiResponse {
  extension?: string,
  files?: {
    gfull?: string,
    gfull2x?: string,
    gthumb?: string,
    gthumb2x?: string,
    large?: string,
    large2x?: string,
    medium?: string,
    medium2x?: string,
    small?: string,
    small2x?: string
  },
  id?: number,
  name?: string
}

export interface IFileService {
  uploadImage: (data: FormData) => Promise<IUploadImageResponse>
}

export const fileService: IFileService = {
  async uploadImage(data) {
    let response = {} as IUploadImageResponse
    await httpService.post<IUploadImageResponse>(API_ENDPOINT.uploadImage, data, {
      headers: {
        'content-type': 'multipart/form-data',
      }
    })
      .then((res) => {
        response = {
          files: {
            gfull: res.data.files?.gfull,
            gfull2x: res.data.files?.gfull2x,
            gthumb: res.data.files?.gthumb,
            gthumb2x: res.data.files?.gthumb2x,
            large: res.data.files?.large,
            large2x: res.data.files?.large2x,
            medium: res.data.files?.medium,
            medium2x: res.data.files?.medium2x,
            small: res.data.files?.small,
            small2x: res.data.files?.small2x,
          },
          id: res.data.id,
          name: res.data.name,
          extension: res.data.extension,
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
