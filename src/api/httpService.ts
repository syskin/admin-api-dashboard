import axios, { AxiosResponse } from 'axios'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  axios.defaults.headers.common['Authorization'] = null

  const token = localStorage['persist:auth'].token
  if (token) axios.defaults.headers.common['Authorization'] = token
  config.baseURL = 'http://localhost:3002/admin/'
  return config
})

const httpMethods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
}

export type ResponseType = AxiosResponse

export default httpMethods
