import axios, { AxiosResponse } from 'axios'
export const interceptor = (store: any) => {
  axios.interceptors.request.use(function (config) {
    axios.defaults.headers.common['Authorization'] = null
    // const token = JSON.parse(localStorage['persist:auth']).token
    const token = store.getState().auth.token
    if (token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    config.baseURL = 'http://localhost:3002/admin/'
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
