import responseFormatConfig from './responseTypes'
import { ResponseFormatType, Payload } from './types'

/* eslint-disable  @typescript-eslint/no-explicit-any */
const formatResponsePath: any = (
  response: any,
  formatResponse: ResponseFormatType,
  payload: Payload
) => {
  if (!response || !formatResponsePath || !payload) return
  const strPath = responseFormatConfig(formatResponse, payload)
  const splittedPath = strPath.split('.')

  splittedPath.forEach((element: string) => {
    if (!response[element]) return
    response = response[element]
  })
  return response
}

export default formatResponsePath
