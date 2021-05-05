import { apiClient } from '../httpService'
import { ResponseType } from '../httpService'

export const getAll = (configuration: any): Promise<ResponseType> => {
  const method = configuration.endpoints.getAll.method
  const url = configuration.endpoints.getAll.path
  return apiClient({ method, url })
}
