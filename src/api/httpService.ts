import axios, { AxiosResponse } from 'axios'
export const interceptor: any = (store: any) => {
  axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = null
    const token = store.getState().auth.token
    if (token && process.env.REACT_APP_AUTHENTICATION === 'true') {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    config.baseURL = process.env.REACT_APP_BASE_URL
    return config
  })
}

const httpMethods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
}
export const apiClient = axios.request

export type ResponseType = AxiosResponse

export default httpMethods
