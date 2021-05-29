import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as endpoints from '../../../api/routes/login'
import * as FormatResponsePath from '../../../services/formatResponsePath'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
import * as actions from '../../actions/authActions'
import {
  SET_TOKEN,
  SIGN_OUT,
  SET_SUCCESS,
  SET_ERROR
} from '../../types/authTypes'

describe('Test auth actions', () => {
  let store

  beforeEach(() => {
    store = mockStore({ token: null, error: null })
  })

  it('should set success message', async () => {
    await store.dispatch(actions.setSuccess('Success'))
    expect(store.getActions()[0]).toEqual({
      type: SET_SUCCESS,
      payload: 'Success'
    })
  })

  it('should logout user while loading state is true', async () => {
    await store.dispatch(actions.signout())
    expect(store.getActions()[1]).toEqual({
      type: SIGN_OUT
    })
  })

  it('should login user', async () => {
    const token = 'test'
    const spyFormatResponsePath = jest.spyOn(FormatResponsePath, 'default')
    spyFormatResponsePath.mockReturnValue(token)

    const loginAnswer = { accessToken: token }
    const spyLogin = jest.spyOn(endpoints, 'login')
    spyLogin.mockReturnValue(loginAnswer)

    store
      .dispatch(
        actions.signin({ email: 'test', password: 'test' }, () =>
          actions.setLoading(false)
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({ token, type: SET_TOKEN })
      })
  })

  it('should not login user', async () => {
    const loginAnswer = { accessToken: 'token' }
    const spyLogin = jest.spyOn(endpoints, 'login')
    spyLogin.mockReturnValue(loginAnswer)

    store
      .dispatch(
        actions.signin({ email: 'test', password: 'test' }, () =>
          actions.setLoading(false)
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({
          payload: 'No token',
          type: SET_ERROR
        })
      })
  })
})
