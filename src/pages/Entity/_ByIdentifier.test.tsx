import * as React from 'react'
import _ByIdentifier from './_ByIdentifier'
import { render, screen } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import * as ReactRouter from 'react-router'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as GetEntityConfiguration from '../../utils/getEntityConfByName'

describe('Entity by identifier page', () => {
  const getEntityConfigurationMock = jest.spyOn(
    GetEntityConfiguration,
    'default'
  )
  const useParamsMock = jest.spyOn(ReactRouter, 'useParams')
  useParamsMock.mockReturnValue({ entityName: 'test', identifier: 'id' })

  it('Mount page with non exisiting entity stored in store', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false },
      entity: { entities: {} }
    }
    const store = mockStore(initialState)
    getEntityConfigurationMock.mockReturnValue({ model: {} })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/entity/users/45`]}>
          <Route path="/entity/:entityName/:identifier">
            <_ByIdentifier identifierKey="id" />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getByText('Entity identifier')).toBeInTheDocument()
  })

  it('Mount page with exisiting entity stored in store', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false },
      entity: { entities: { test: { form: {} } } }
    }
    const store = mockStore(initialState)

    getEntityConfigurationMock.mockReturnValue({ model: {} })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/entity/test/45`]}>
          <Route path="/entity/:entityName/:identifier">
            <_ByIdentifier identifierKey="id" />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getByText('Entity identifier')).toBeInTheDocument()
  })
})
