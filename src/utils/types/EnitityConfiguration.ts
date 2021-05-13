export interface Configuration {
  name: string
  endpoints: Endpoints
  actions: Record<string, any>[]
  displayedFields: string[]
  model: Record<string, any>
}

interface Endpoints {
  getAll: {
    filter: boolean
    method: string
    defaultFilter: Record<string, any>
    count: { responsePath: string }
    pagination: boolean
    path: string
    responsePath: string
  }
  getOneByIdentifier: {
    method: string
    path: string
    responsePath: string
  }
  updateOneByIdentifier: {
    method: string
    path: string
    responsePath: string
  }
}
