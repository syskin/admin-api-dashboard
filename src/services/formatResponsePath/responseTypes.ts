import {
  ResponseFormatType,
  Payload,
  LOGIN_FORMAT,
  ENTITY_FORMAT
} from './types'
import { loginResponsePath } from '../../config/login'

const responseFormatConfig = (
  responseFormat: ResponseFormatType,
  payload: Payload
): string => {
  const defaultFormat = 'response'
  switch (responseFormat) {
    case LOGIN_FORMAT:
      return loginResponsePath
    case ENTITY_FORMAT:
      if (!payload) return defaultFormat
      return payload.responsePath
    default:
      return defaultFormat
  }
}

export default responseFormatConfig
