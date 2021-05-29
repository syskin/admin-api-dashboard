import entityReducer from '../../reducers/entityReducer'
import { SET_TABLE_DATA, SET_FORM_DATA, SET_LOADING, SET_ERROR } from '../../types/entityTypes'
describe('Test entities reducers', () => {
  let state = {
    entities: {},
    loading: false,
    error: ''
  }

  const useCases = [
    {
      action: {},
      result : state
    },
    {
      action: {
        type: SET_TABLE_DATA
      },
      result : {...state, filter: undefined, name: undefined, count: undefined, data: undefined}
    },
    {
      action: {
        type: SET_TABLE_DATA,
        filter: { limit: 15 }
      },
      result : {...state, filter: {limit: 15}, name: undefined, count: undefined, data: undefined}
    },
    {
      action: {
        type: SET_TABLE_DATA,
        filter: {}
      },
      result : {...state, filter: {limit: 10}, name: undefined, count: undefined, data: undefined}
    },
    {
      action: {
        type: SET_FORM_DATA,
        name: 'test'
      },
      result : state
    },
    {
      action: {
        type: SET_ERROR,
        payload: 'Error!',
      },
      result : {...state, error: 'Error!'}
    },
    {
      action: {
        type: SET_LOADING,
        payload: 'loading...'
      },
      result : {...state, loading: 'loading...'}
    }
  ]

  it('test generice use case', async () => {
    useCases.forEach(({action, result}) => {
      const reducerResult = entityReducer(state, action)
      expect(reducerResult).toStrictEqual(result)
    })
  })

  it('should update form data', () => {
    state = {
      entities: { test: {} },
      loading: false,
      error: ''
    }
    const action = {
      type: SET_FORM_DATA,
      name: 'test',
      data: {}
    }
    const reducerResult = entityReducer(state, action)
    const result = state
    result.entities.test.form = {}
    expect(reducerResult).toStrictEqual(result)
  })

})
