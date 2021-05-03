import responseFormatConfig from './responseTypes'
import { ResponseFormatType } from './types'

/* eslint-disable  @typescript-eslint/no-explicit-any */
const formatResponsePath: any = (
  response: any,
  formatResponse: ResponseFormatType
) => {
  const strPath = responseFormatConfig(formatResponse)

  const splittedPath = strPath.split('.')

  splittedPath.forEach((element) => {
    response = response[element]
  })

  return response
}

export default formatResponsePath
