import {
  EntityAction,
  EntityState,
  SET_TABLE_DATA,
  SET_LOADING,
  SET_ERROR,
  SET_SUCCESS,
  SET_FORM_DATA
} from '../types/entityTypes'

const initialState: EntityState = {
  entities: {},
  loading: false,
  error: '',
  success: ''
}

const entityReducer = (
  state = initialState,
  action: EntityAction
): EntityState => {
  switch (action.type) {
    case SET_TABLE_DATA:
      if (!action) return { ...state }
      const { count, data, name, filter } = action
      const newState = (state.entities[action.name] = {
        count,
        data,
        name,
        filter
      })
      state = { ...state, ...newState }

      return {
        ...state,
        loading: false
      }
    case SET_FORM_DATA:
      if (!action) return { ...state }

      if (!state.entities[action.name])
        state.entities[action.name] = {
          name: action.name,
          data: [],
          count: 0,
          filter: {}
        }
      state.entities[action.name].form = action.data
      return {
        ...state,
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
        error: action.payload,
        loading: false
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

export default entityReducer
