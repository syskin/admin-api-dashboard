export const parseFilterByMethod: any = (
  method: string,
  filter: any,
  emptyFields: boolean
) => {
  if (!filter) return

  if (!emptyFields)
    Object.keys(filter).map((key) => {
      if (!filter[key]) delete filter[key]
    })

  switch (method) {
    case 'get':
      let params = '?'
      Object.keys(filter).map((key) => {
        params += `${key}=${filter[key]}&`
      })
      params = params.slice(0, params.length - 1)
      return params
    default:
      return filter
  }
}
