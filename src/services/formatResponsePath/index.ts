import responseFormatConfig from './responseTypes'
import { ResponseFormatType, Payload } from './types'

/* eslint-disable  @typescript-eslint/no-explicit-any */
const formatResponsePath: any = (
  response: any,
  formatResponse: ResponseFormatType,
  payload: Payload
) => {
  const strPath = responseFormatConfig(formatResponse, payload)
  const splittedPath = strPath.split('.')

  splittedPath.forEach((element: string) => {
    response = response[element]
  })
  return response
}

export default formatResponsePath
