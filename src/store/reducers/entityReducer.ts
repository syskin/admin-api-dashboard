import {
  EntityAction,
  EntityState,
  SET_DATA,
  SET_LOADING,
  SET_ERROR,
  SET_SUCCESS
} from '../types/entityTypes'

const initialState: EntityState = {
  name: null,
  data: [],
  loading: false,
  error: '',
  success: ''
}

const entityReducer = (
  state = initialState,
  action: EntityAction
): EntityState => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data
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

export default entityReducer
