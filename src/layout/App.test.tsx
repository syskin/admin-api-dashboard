import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

describe('With React Testing Library', () => {
  const mockStore = configureMockStore([thunk])
  const div = document.createElement('div')
  const initialState = {
    auth: { authenticated: false }
  }
  const route = [{ name: 'test', path: '/test', private: true }]
  it('Mount App without crashing', () => {
    const store = mockStore(initialState)
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App routes={route} />
        </Router>
      </Provider>,
      div
    )
  })
})
