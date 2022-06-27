import { ERequestStatus } from './status'

export interface IApiResponse {
  status: ERequestStatus.Success | ERequestStatus.Error
}
