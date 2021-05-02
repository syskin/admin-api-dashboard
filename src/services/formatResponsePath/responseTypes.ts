import { ResponseFormatType, LOGIN_FORMAT } from './types'
import { loginResponseFormat } from '../../config/login'

const responseFormatConfig = (responseFormat: ResponseFormatType): string => {
  switch (responseFormat.type) {
    case LOGIN_FORMAT:
      return loginResponseFormat
    default:
      return 'response'
  }
}

export default responseFormatConfig
