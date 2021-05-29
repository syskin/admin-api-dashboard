import { ThunkAction } from 'redux-thunk'

import {
  credentials,
  AuthAction,
  SET_TOKEN,
  SET_LOADING,
  SIGN_OUT,
  SET_ERROR,
  SET_SUCCESS
} from '../types/authTypes'
import { RootState } from '..'
import { login } from '../../api/routes/login'
import formatResponsePath from '../../services/formatResponsePath'
import { LOGIN_FORMAT } from '../..//services/formatResponsePath/types'
import { toast } from 'react-toastify'

// Log in
export const signin = (
  data: credentials,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const responsePayload = await login(data)
      const token = formatResponsePath(responsePayload.data, LOGIN_FORMAT)
      if (!token) throw new Error('No token')
      dispatch({
        type: SET_TOKEN,
        token: token
      })
    } catch (err) {
      onError()
      dispatch(setError(err.message))
      toast.error(err.message)
    }
  }
}

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch(setLoading(true))
    dispatch({
      type: SIGN_OUT
    })
  }
}

// Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value
    })
  }
}

// Set error
export const setError = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg
    })
  }
}

// Set success
export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg
    })
  }
}
