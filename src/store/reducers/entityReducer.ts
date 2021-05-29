import {
  EntityAction,
  EntityState,
  SET_TABLE_DATA,
  SET_LOADING,
  SET_ERROR,
  SET_FORM_DATA
} from '../types/entityTypes'

const initialState: EntityState = {
  entities: {},
  loading: false,
  error: ''
}

const entityReducer = (
  state = initialState,
  action: EntityAction
): EntityState => {
  if (!action || !action.type) return state
  switch (action.type) {
    case SET_TABLE_DATA:
      const { count, data, name, filter } = action
      const newState = (state.entities[action.name] = {
        count,
        data,
        name,
        filter: filter
      })

      if (filter && !newState.filter.limit)
        newState.filter.limit = filter.limit || 10

      state = { ...state, ...newState }

      return {
        ...state,
        loading: false
      }
    case SET_FORM_DATA:
      if (!state.entities[action.name])
        state.entities[action.name] = {
          name: action.name,
          data: [],
          count: 0,
          filter: { limit: 10 }
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
    default:
      return state
  }
}

export default entityReducer
