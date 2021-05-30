import Routes from './Routes'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

describe('Test Navigation component', () => {
  const routes = [
    {
      name: 'entities',
      path: '/entities',
      private: true
    },
    {
      name: 'test',
      path: '/entity/users/1555',
      private: true
    },
    {
      name: 'test',
      path: '/entity/users',
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
      auth: { authenticated: false },
      entity: { entities: {} }
    }
    const store = mockStore(initialState)
    routes.forEach((route) => {
      const component = componentWrapper(
        <Routes routes={routes} />,
        store,
        route.path
      )
      expect(component).toBeTruthy()
    })
  })
  it('Mount without crash logged in', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: true },
      entity: { entities: {} }
    }
    const store = mockStore(initialState)

    routes.forEach((route) => {
      const component = componentWrapper(
        <Routes routes={routes} />,
        store,
        route.path
      )
      expect(component).toBeTruthy()
    })
  })
  it('Mount without crash not login without authentication', () => {
    process.env.REACT_APP_AUTHENTICATION = 'false'
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false },
      entity: { entities: {} }
    }
    const store = mockStore(initialState)
    routes.forEach((route) => {
      const component = componentWrapper(
        <Routes routes={routes} />,
        store,
        route.path
      )
      expect(component).toBeTruthy()
    })
  })
})

const componentWrapper = (component: any, store: any, currentRoute: string) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[currentRoute]}>
        <Route>{component}</Route>
      </MemoryRouter>
    </Provider>
  )
}
