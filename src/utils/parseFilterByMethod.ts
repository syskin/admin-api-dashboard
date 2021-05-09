export const parseFilterByMethod = (method: string, filter: any) => {
  if (!filter) return
  Object.keys(filter).map((key) => {
    if (!filter[key]) delete filter[key]
  })
  switch (method) {
    case 'get':
      let params = '?'
      Object.keys(filter).map((key, index) => {
        params += `${key}=${filter[key]}&`
      })
      params = params.slice(0, params.length - 1)
      return params
    default:
      return filter
  }
}
