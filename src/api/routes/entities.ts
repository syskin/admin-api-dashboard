import { apiClient } from '../httpService'
import { ResponseType } from '../httpService'
import { parseFilterByMethod } from '../../utils/parseFilterByMethod'

export const getAll = (
  configuration: any,
  filter: any
): Promise<ResponseType> => {
  const method = configuration.endpoints.getAll.method
  let url = configuration.endpoints.getAll.path
  filter = parseFilterByMethod(method, filter)

  if (method === 'get') {
    url += filter
    return apiClient({ method, url })
  }
  return apiClient({ method, url, data: filter })
}
