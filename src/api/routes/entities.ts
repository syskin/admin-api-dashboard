import { apiClient } from '../httpService'
import { ResponseType } from '../httpService'
import { parseFilterByMethod } from '../../utils/parseFilterByMethod'
import { getEntityConfiguration } from '../../utils/getEntityConfByName'

export const getAll = (
  entityName: string,
  filter: any
): Promise<ResponseType> => {
  return _getEndpointConfiguration(entityName, `getAll`, filter)
}

export const getOneByIdentifier = (
  entityName: string,
  identifier: string | null
): Promise<ResponseType> => {
  return _getEndpointConfiguration(
    entityName,
    `getOneByIdentifier`,
    null,
    identifier
  )
}

function _getEndpointConfiguration(
  entityName: any,
  endpointName: string,
  filter: any = null,
  identifier: string | null = null
) {
  const configuration: any = getEntityConfiguration(entityName)
  if (!configuration) throw new Error(`No configuration found`)

  const method = configuration.endpoints[endpointName].method || `get`
  let url = configuration.endpoints[endpointName].path || `/`

  if (filter) filter = parseFilterByMethod(method, filter)
  if (identifier) url += identifier

  if (method === 'get') {
    if (filter) url += filter
    return apiClient({ method, url })
  }
  return apiClient({ method, url, data: filter })
}
