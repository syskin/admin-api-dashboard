import Navigation from './Navigation'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

describe('Test Navigation component', () => {
  const routes = [
    {
      name: 'test',
      path: '/test',
      private: true
    },
    {
      name: 'signin',
      path: '/signin',
      private: false
    }
  ]
  it('Mount without crash not logged in', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false }
    }
    const store = mockStore(initialState)
    const component = componentWrapper(<Navigation routes={routes} />, store)

    expect(component).toBeTruthy()
  })
  it('Mount without crash logged in', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: true }
    }
    const store = mockStore(initialState)
    const component = componentWrapper(<Navigation routes={routes} />, store)

    expect(component).toBeTruthy()
  })
  it('Mount without crash not login without authentication', () => {
    process.env.REACT_APP_AUTHENTICATION = 'false'
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: true }
    }
    const store = mockStore(initialState)
    const component = componentWrapper(<Navigation routes={routes} />, store)

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
