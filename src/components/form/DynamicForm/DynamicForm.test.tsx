import DynamicForm from './index'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const fields: any = {
  name: {
    type: 'String'
  },
  created: {
    type: 'Date'
  },
  specs: {
    type: 'Json'
  },
  count: {
    type: 'Number'
  },
  isActive: {
    type: 'Boolean'
  },
  helloWorld: {
    type: 'customType'
  }
}

const values = {
  test: 'hello',
  created: '2020-05-10',
  specs: { test: '2' }
}
describe('Test Dynamic Form component', () => {
  it('Mount with loading false', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      entity: { loading: false }
    }
    const store = mockStore(initialState)
    const component = componentWrapper(
      <DynamicForm fields={fields} values={values} />,
      store
    )

    expect(component).toBeTruthy()
  })

  it('Mount with loading true', () => {
    const mockStore = configureMockStore([thunk])
    const initialState = {
      entity: { loading: true }
    }
    const store = mockStore(initialState)
    const component = componentWrapper(
      <DynamicForm fields={fields} values={values} />,
      store
    )

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
