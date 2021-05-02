import http from '../httpService'

import { credentials } from '../../store/types'

export const login = (credentials: credentials) => {
  return http.post('login', credentials)
}
