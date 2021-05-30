import SignIn from './SignIn'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

describe('Test Signin form component', () => {
  it('Mount with loading false', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false, loading: false }
    }
    const store = mockStore(initialState)
    const component = componentWrapper(<SignIn />, store)

    expect(component).toBeTruthy()
  })
  it('Mount with error', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false, error: 'There is an error' }
    }
    const store = mockStore(initialState)
    const component = componentWrapper(<SignIn />, store)

    expect(component).toBeTruthy()
  })
})

const componentWrapper = (component: any, store: any) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Route>{component}</Route>
      </MemoryRouter>
    </Provider>
  )
}
