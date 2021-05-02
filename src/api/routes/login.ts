import http from '../httpService'

import { credentials } from '../../store/types'
import { ResponseType } from '../httpService'

export const login = (credentials: credentials): Promise<ResponseType> => {
  return http.post('login', credentials)
}
