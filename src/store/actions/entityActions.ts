import { ThunkAction } from 'redux-thunk'
import {
  EntityAction,
  EntityFilter,
  SET_DATA,
  SET_LOADING,
  SET_ERROR,
  SET_SUCCESS
} from '../types/entityTypes'
import { RootState } from '..'
import { getAll } from '../../api/routes/entities'
import formatResponsePath from '../../services/formatResponsePath'
import { getEntityConfiguration } from '../../utils/getEntityConfByName'
import { ENTITY_FORMAT } from '../../services/formatResponsePath/types'

// Get entity data
export const getData = (
  entityName: string,
  onError: () => void
): ThunkAction<void, RootState, null, EntityAction> => {
  return async (dispatch) => {
    try {
      let count = null
      const configuration = getEntityConfiguration(entityName)
      if (!configuration) throw new Error('Entity not found')

      const responsePayload = await getAll(
        configuration,
        configuration.endpoints.getAll.defaultFilter
      )

      // Store data response
      const data = formatResponsePath(
        responsePayload.data,
        ENTITY_FORMAT,
        configuration.endpoints.getAll
      )

      // Store count property if it is present in the response
      if (
        configuration.endpoints.getAll.pagination &&
        configuration.endpoints.getAll.count
      )
        count = formatResponsePath(
          responsePayload.data,
          ENTITY_FORMAT,
          configuration.endpoints.getAll.count
        )

      dispatch({
        type: SET_DATA,
        data,
        count,
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
