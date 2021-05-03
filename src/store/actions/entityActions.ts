import { ThunkAction } from 'redux-thunk'
import axios from 'axios'
import {
  EntityAction,
  EntityFilter,
  SET_DATA,
  SET_LOADING,
  SET_ERROR,
  SET_SUCCESS
} from '../types/entityTypes'
import { RootState } from '..'
// import {} from '../../api/routes'
import formatResponsePath from '../../services/formatResponsePath'
// import { } from '../../services/formatResponsePath/types'

// Get entity data
export const getData = (
  entityName: string,
  onError: () => void
): ThunkAction<void, RootState, null, EntityAction> => {
  return async (dispatch) => {
    try {
      const posts = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      )
      dispatch({
        type: SET_DATA,
        data: posts.data,
        name: entityName
      })
    } catch (err) {
      onError()
      dispatch(setError(err.message))
    }
  }
}

// Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, EntityAction> => {
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
): ThunkAction<void, RootState, null, EntityAction> => {
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
): ThunkAction<void, RootState, null, EntityAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg
    })
  }
}
