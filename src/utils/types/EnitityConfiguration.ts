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
    url: string
    responsePath: string
  }
  getOneByIdentifier: {
    method: string
    url: string
    responsePath: string
  }
  updateOneByIdentifier: {
    method: string
    url: string
  }
  deleteOneByIdentifier: {
    method: string
    url: string
  }
}
