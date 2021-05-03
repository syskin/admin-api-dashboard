export const SET_TOKEN = 'SET_TOKEN'
export const SIGN_OUT = 'SIGN_OUT'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const SET_SUCCESS = 'SET_SUCCESS'

export interface AuthState {
  token: string | null
  authenticated: boolean
  loading: boolean
  error: string
  success: string
}

export interface credentials {
  email: string
  password: string
}

// Actions
interface SetTokenAction {
  type: typeof SET_TOKEN
  token: string
}

interface SignOutAction {
  type: typeof SIGN_OUT
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

export type AuthAction =
  | SetTokenAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | SetSuccessAction
