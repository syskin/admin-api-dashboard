import { apiClient } from '../httpService'
import { ResponseType } from '../httpService'
import { parseFilterByMethod } from '../../utils/parseFilterByMethod'
import getEntityConfiguration from '../../utils/getEntityConfByName'

export const getAll = (
  entityName: string,
  filter: Record<string, any> | null
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
  entityName: string,
  endpointName: string,
  filter: Record<string, any> | null = null,
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
