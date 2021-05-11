import { ThunkAction } from 'redux-thunk'
import {
  EntityAction,
  Entity,
  SET_TABLE_DATA,
  SET_FORM_DATA,
  SET_LOADING,
  SET_ERROR,
  SET_SUCCESS
} from '../types/entityTypes'
import { RootState } from '..'
import { getAll, getOneByIdentifier } from '../../api/routes/entities'
import formatResponsePath from '../../services/formatResponsePath'
import { getEntityConfiguration } from '../../utils/getEntityConfByName'
import { ENTITY_FORMAT } from '../../services/formatResponsePath/types'

// Get entity table data
export const getTableData = (
  entityName: string,
  filter: any,
  onError: () => void
): ThunkAction<void, RootState, null, EntityAction> => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true))
      let count = null
      const configuration = getEntityConfiguration(entityName)
      if (!configuration) throw new Error('Entity not found')
      let searchFilter: { [key: string]: any } = {
        ...configuration.endpoints.getAll.defaultFilter
      }

      const currentEntities = getState().entity.entities

      let currentEntity = null
      if (currentEntities && currentEntities[entityName])
        currentEntity = currentEntities[entityName]

      if (currentEntity && currentEntity.filter)
        searchFilter = { ...searchFilter, ...currentEntity.filter }
      if (filter) {
        searchFilter = { ...searchFilter, ...filter }
      }

      const responsePayload = await getAll(entityName, searchFilter)

      // Format data response
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
        type: SET_TABLE_DATA,
        data,
        count,
        name: entityName,
        filter: searchFilter
      })
    } catch (err) {
      onError()
      dispatch(setError(err.message))
    }
  }
}

// Get entity form data
export const getFormData = (
  entityName: string,
  identifier: string,
  onError: () => void
): ThunkAction<void, RootState, null, EntityAction> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const responsePayload = await getOneByIdentifier(entityName, identifier)
      const configuration = getEntityConfiguration(entityName)

      // Format data response
      const data = formatResponsePath(
        responsePayload.data,
        ENTITY_FORMAT,
        configuration.endpoints.getOneByIdentifier
      )
      dispatch({
        type: SET_FORM_DATA,
        data,
        name: entityName,
        identifier
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
