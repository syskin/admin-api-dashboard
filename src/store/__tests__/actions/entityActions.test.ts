import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as endpoints from '../../../api/routes/entities'
import * as FormatResponsePath from '../../../services/formatResponsePath'
import * as GetEntityConfiguration from '../../../utils/getEntityConfByName'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
import * as actions from '../../actions/entityActions'
import {
  SET_ERROR,
  SET_FORM_DATA,
  SET_LOADING,
  SET_TABLE_DATA
} from '../../types/entityTypes'

describe('Test auth actions', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({ entity: { entities: {} } })
  })

  it('should reinitialize entity store by name', async () => {
    store
      .dispatch(
        actions.reinitializeFormData('test', () => actions.setLoading(false))
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({
          payload: true,
          type: SET_LOADING
        })
        expect(store.getActions()[1]).toEqual({
          data: {},
          name: 'test',
          type: SET_FORM_DATA
        })
      })
  })

  it('sould return Entity not found', async () => {
    const entityName = 'test'
    const filter: Record<string, any> = { key: 'value' }

    const spyGetEntityConfiguration = jest.spyOn(
      GetEntityConfiguration,
      'default'
    )
    spyGetEntityConfiguration.mockReturnValue(null)

    store
      .dispatch(
        actions.getTableData(entityName, filter, () =>
          actions.setLoading(false)
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({
          payload: true,
          type: SET_LOADING
        })
        expect(store.getActions()[1]).toEqual({
          payload: 'Entity not found',
          type: SET_ERROR
        })
      })
  })

  it('sould return a basic entity table data', async () => {
    const entityName = 'test'
    const filter: Record<string, any> = { key: 'value' }

    const spyGetEntityConfiguration = jest.spyOn(
      GetEntityConfiguration,
      'default'
    )
    spyGetEntityConfiguration.mockReturnValue({
      endpoints: {
        getAll: {
          defaultFilter: {}
        }
      }
    })

    const mockedResponse: any = [{ key: 'value' }]
    const spyGetAllEndpoint = jest.spyOn(endpoints, 'getAll')
    spyGetAllEndpoint.mockReturnValue(mockedResponse)

    const spyFormatResponsePath = jest.spyOn(FormatResponsePath, 'default')
    spyFormatResponsePath.mockReturnValue(mockedResponse)

    store
      .dispatch(
        actions.getTableData(entityName, filter, () =>
          actions.setLoading(false)
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({
          payload: true,
          type: SET_LOADING
        })
        expect(store.getActions()[1]).toEqual({
          type: SET_TABLE_DATA,
          count: null,
          filter,
          data: mockedResponse,
          name: entityName
        })
      })
  })

  it('sould update entity table data', async () => {
    const entityName = 'test'
    const filter: Record<string, any> = { key: 'value' }

    store = mockStore({
      entity: {
        entities: {
          test: {
            filter,
            data: [],
            count: 1
          }
        }
      }
    })

    const spyGetEntityConfiguration = jest.spyOn(
      GetEntityConfiguration,
      'default'
    )
    spyGetEntityConfiguration.mockReturnValue({
      endpoints: {
        getAll: {
          defaultFilter: {},
          count: {},
          pagination: true
        }
      }
    })

    const mockedResponse: any = 'mockedResponse'
    const spyGetAllEndpoint = jest.spyOn(endpoints, 'getAll')
    spyGetAllEndpoint.mockReturnValue(mockedResponse)

    const spyFormatResponsePath = jest.spyOn(FormatResponsePath, 'default')
    spyFormatResponsePath.mockReturnValue(mockedResponse)

    store
      .dispatch(
        actions.getTableData(entityName, filter, () =>
          actions.setLoading(false)
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({
          payload: true,
          type: SET_LOADING
        })
        expect(store.getActions()[1]).toEqual({
          type: SET_TABLE_DATA,
          count: mockedResponse,
          filter,
          data: mockedResponse,
          name: entityName
        })
      })
  })

  it('sould define form data', async () => {
    const entityName = 'test'

    const spyGetEntityConfiguration = jest.spyOn(
      GetEntityConfiguration,
      'default'
    )
    spyGetEntityConfiguration.mockReturnValue({
      endpoints: {
        getAll: {
          defaultFilter: {}
        }
      }
    })

    const mockedResponse: any = [{ key: 'value' }]
    const spyGetAllEndpoint = jest.spyOn(endpoints, 'getAll')
    spyGetAllEndpoint.mockReturnValue(mockedResponse)

    const spyFormatResponsePath = jest.spyOn(FormatResponsePath, 'default')
    spyFormatResponsePath.mockReturnValue(mockedResponse)

    store
      .dispatch(
        actions.getFormData(entityName, 'id', () => actions.setLoading(false))
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({
          payload: true,
          type: SET_LOADING
        })
        expect(store.getActions()[1]).toEqual({
          type: SET_FORM_DATA,
          data: mockedResponse,
          name: entityName
        })
      })
  })

  it('sould return no data', async () => {
    const entityName = 'test'

    const spyGetEntityConfiguration = jest.spyOn(
      GetEntityConfiguration,
      'default'
    )
    spyGetEntityConfiguration.mockReturnValue({
      endpoints: {
        getAll: {
          defaultFilter: {}
        }
      }
    })

    const mockedResponse: any = [{ key: 'value' }]
    const spyGetAllEndpoint = jest.spyOn(endpoints, 'getAll')
    spyGetAllEndpoint.mockReturnValue(mockedResponse)

    const spyFormatResponsePath = jest.spyOn(FormatResponsePath, 'default')
    spyFormatResponsePath.mockReturnValue(null)

    store
      .dispatch(
        actions.getFormData(entityName, 'id', () => actions.setLoading(false))
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({
          payload: true,
          type: SET_LOADING
        })
        expect(store.getActions()[1]).toEqual({
          type: SET_ERROR,
          payload: 'No data'
        })
      })
  })

  it('sould update form data', async () => {
    const mockedResponse: any = { key: 'value' }
    const spyGetAllEndpoint = jest.spyOn(endpoints, 'updateOneByIdentifier')
    spyGetAllEndpoint.mockReturnValue(mockedResponse)
    const data = mockedResponse
    const entityName = 'test'
    const identifier = 'id'
    store
      .dispatch(
        actions.updateFormData(data, entityName, identifier, () =>
          actions.setLoading(false)
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({
          type: SET_FORM_DATA,
          data,
          name: entityName,
          identifier
        })
      })
  })

  it('sould return error update form data', async () => {
    const mockedResponse: any = { key: 'value' }
    const spyGetAllEndpoint = jest.spyOn(endpoints, 'updateOneByIdentifier')
    spyGetAllEndpoint.mockReturnValue(mockedResponse)

    store
      .dispatch(
        actions.updateFormData({ key: 'value' }, null, 'id', () =>
          actions.setLoading(false)
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({
          type: SET_ERROR,
          payload: 'Missing information'
        })
      })
  })
})
