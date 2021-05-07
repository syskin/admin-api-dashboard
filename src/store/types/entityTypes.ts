export const SET_DATA = 'SET_DATA'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const SET_SUCCESS = 'SET_SUCCESS'

export interface EntityState {
  name: string | null
  data: any[]
  count: number | null
  loading: boolean
  error: string
  success: string
}

export interface EntityFilter {
  name: string
  filter: Record<string, unknown>
  data: any[]
}

// Actions
interface SetDataAction {
  type: typeof SET_DATA
  data: any[]
  count: number | null
  name: string
}

interface SetLoadingAction {
  type: typeof SET_LOADING
  payload: boolean
}

interface SetErrorAction {
  type: typeof SET_ERROR
  payload: string
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS
  payload: string
}

export type EntityAction =
  | SetDataAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction
