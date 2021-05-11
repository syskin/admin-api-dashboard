import Entity from '../../pages/Entity'

export const SET_TABLE_DATA = 'SET_TABLE_DATA'
export const SET_FORM_DATA = 'SET_FORM_DATA'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const SET_SUCCESS = 'SET_SUCCESS'

export interface Entity {
  form?: any
  count: number
  data: any[]
  name: string
  filter: any
}

export interface EntityState {
  entities: Record<Entity['name'], Entity>
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
interface SetTableDataAction {
  type: typeof SET_TABLE_DATA
  data: any[]
  count: number
  name: string
  filter: any
}

interface SetFormDataAction {
  type: typeof SET_FORM_DATA
  data: any
  name: string
  identifier: string
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
  | SetFormDataAction
  | SetTableDataAction
  | SetLoadingAction
  | SetErrorAction
  | SetSuccessAction
