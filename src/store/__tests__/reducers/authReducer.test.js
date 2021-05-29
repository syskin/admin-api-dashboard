import authReducer from '../../reducers/authReducer'
import { SET_TOKEN, SIGN_OUT, SET_LOADING, SET_ERROR, SET_SUCCESS } from '../../types/authTypes'
describe('Test auth reducers', () => {
  const state = {
    token: null,
    authenticated: false,
    loading: false,
    error: '',
    success: ''
  }

  const useCases = [
    {
      action: {},
      result : state
    },
    {
      action: {
        type: SET_TOKEN,
        token: 'test',
        authenticated: true
      },
      result : {...state, token: 'test', authenticated: true}
    },
    {
      action: {
        type: SIGN_OUT
      },
      result : {...state, token: null, authenticated: false, loading: false}
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
    },
    {
      action: {
        type: SET_SUCCESS,
        payload: 'Succes :)'
      },
      result : {...state, success: 'Succes :)'}
    }
  ]
  it('test every use case', async () => {
    useCases.forEach(({action, result}) => {
      const reducerResult = authReducer(state, action)
      expect(reducerResult).toStrictEqual(result)
    })
  })
})
