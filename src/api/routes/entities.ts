import { apiClient } from '../httpService'
import { ResponseType } from '../httpService'
import { parseFilterByMethod } from '../../utils/parseFilterByMethod'
import getEntityConfiguration from '../../utils/getEntityConfByName'

export const getAll = (
  entityName: string,
  filter: Record<string, any> | null
): Promise<ResponseType> => {
  return _getEndpointConfiguration(entityName, `getAll`, filter, null, false)
}

export const getOneByIdentifier = (
  entityName: string,
  identifier: string | null
): Promise<ResponseType> => {
  return _getEndpointConfiguration(
    entityName,
    `getOneByIdentifier`,
    null,
    identifier,
    false
  )
}

export const updateOneByIdentifier = (
  data: Record<string, any>,
  entityName: string,
  identifier: string | null
): Promise<ResponseType> => {
  return _getEndpointConfiguration(
    entityName,
    `updateOneByIdentifier`,
    data,
    identifier,
    true
  )
}

export const deleteOneByIdentifier = (
  entityName: string,
  identifier: string | null
): Promise<ResponseType> => {
  return _getEndpointConfiguration(
    entityName,
    `deleteOneByIdentifier`,
    null,
    identifier,
    false
  )
}

function _getEndpointConfiguration(
  entityName: string,
  endpointName: string,
  payload: Record<string, any> | null = null,
  identifier: string | null = null,
  payloadEmptyFields: boolean
) {
  try {
    const configuration: any = getEntityConfiguration(entityName)
    if (!configuration || !configuration.endpoints[endpointName])
      throw new Error(`Configuration files not correctly defined`)

    const method = configuration.endpoints[endpointName].method || `get`
    let url = configuration.endpoints[endpointName].path || `/`

    if (payload)
      payload = parseFilterByMethod(method, payload, payloadEmptyFields)
    if (identifier) url += identifier

    if (method === 'get') {
      if (payload) url += payload
      return apiClient({ method, url })
    }
    return apiClient({ method, url, data: payload })
  } catch (error) {
    return error
  }
}
