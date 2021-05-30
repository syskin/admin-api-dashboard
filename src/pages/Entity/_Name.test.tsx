import * as React from 'react'
import _Name from './_Name'
import { render } from '@testing-library/react'
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
  getEntityConfigurationMock.mockReturnValue({ endpoints: {} })

  const useParamsMock = jest.spyOn(ReactRouter, 'useParams')
  useParamsMock.mockReturnValue({ entityName: 'test' })

  it('Mount page with non exisiting entity no data table', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false },
      entity: { entities: {}, loading: true }
    }
    const store = mockStore(initialState)

    const page = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/entity/test`]}>
          <Route path="/entity/:entityName">
            <_Name name="test" />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    expect(page).toBeTruthy()
  })

  it('Mount page with data table', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false },
      entity: {
        entities: {
          test: {
            form: {},
            data: [{ id: 1, name: 'test' }],
            filter: {
              limit: 5,
              page: 1
            }
          }
        }
      }
    }
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
    const store = mockStore(initialState)
    getEntityConfigurationMock.mockReturnValue({
      displayedFields: ['id', 'name'],
      endpoints: { getAll: { pagination: true } },
      model: {
        id: { identifier: true, type: 'String' },
        name: { type: 'String' }
      }
    })

    const page = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/entity/test`]}>
          <Route path="/entity/:entityName">
            <_Name name="test" />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    expect(page).toBeTruthy()
  })

  it('Mount page with data table without pagination', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false },
      entity: {
        entities: {
          test: {
            form: {},
            data: [{ id: 1, name: 'test' }],
            filter: {
              limit: 5,
              page: 1
            }
          }
        }
      }
    }
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
    const store = mockStore(initialState)
    getEntityConfigurationMock.mockReturnValue({
      displayedFields: ['id', 'name'],
      endpoints: { getAll: { pagination: false } },
      model: {
        id: { identifier: true, type: 'String' },
        name: { type: 'String' }
      }
    })

    const page = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/entity/test`]}>
          <Route path="/entity/:entityName">
            <_Name name="test" />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    expect(page).toBeTruthy()
  })

  it('Mount page with table without data count 0', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false },
      entity: {
        entities: {
          test: {
            form: {},
            data: [],
            count: 0,
            filter: {
              limit: 5,
              page: 1
            }
          }
        }
      }
    }
    const store = mockStore(initialState)
    getEntityConfigurationMock.mockReturnValue({
      displayedFields: ['id', 'name'],
      endpoints: { getAll: { pagination: true } },
      model: {
        id: { identifier: true, type: 'String' },
        name: { type: 'String' }
      }
    })

    const page = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/entity/test`]}>
          <Route path="/entity/:entityName">
            <_Name name="test" />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    expect(page).toBeTruthy()
  })

  it('Mount page without filter', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false },
      entity: {
        entities: {
          test: {
            form: {}
          }
        }
      }
    }
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
    const store = mockStore(initialState)
    getEntityConfigurationMock.mockReturnValue({
      displayedFields: ['id', 'name'],
      endpoints: { getAll: { pagination: true } },
      model: {
        id: { identifier: true, type: 'String' },
        name: { type: 'String' }
      }
    })

    const page = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/entity/test`]}>
          <Route path="/entity/:entityName">
            <_Name name="test" />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    expect(page).toBeTruthy()
  })

  it('Mount page without keys filter', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      auth: { authenticated: false },
      entity: {
        entities: {
          test: {
            form: {},
            filter: {}
          }
        }
      }
    }
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
    const store = mockStore(initialState)
    getEntityConfigurationMock.mockReturnValue({
      displayedFields: ['id', 'name'],
      endpoints: { getAll: { pagination: true } },
      model: { id: { type: 'String' }, name: { type: 'String' } }
    })

    const page = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/entity/test`]}>
          <Route path="/entity/:entityName">
            <_Name name="test" />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    expect(page).toBeTruthy()
  })
})
