import {
  AuthAction,
  AuthState,
  SET_TOKEN,
  SET_LOADING,
  SIGN_OUT,
  SET_ERROR,
  SET_SUCCESS
} from '../types/authTypes'

const initialState: AuthState = {
  token: null,
  authenticated: false,
  loading: false,
  error: '',
  success: ''
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  if (!action || !action.type) return state
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
        authenticated: true
      }
    case SIGN_OUT:
      return {
        ...state,
        token: null,
        authenticated: false,
        loading: false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload
      }
    default:
      return state
  }
}

export default authReducer
