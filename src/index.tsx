import React from 'react'
import ReactDOM from 'react-dom'
import App from './layout/App'

import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import { interceptor } from './api/httpService'
import { store, persistor } from './store'
interceptor(store)

const routes = [
  {
    name: 'Home',
    path: '/',
    private: true
  },
  {
    name: 'Login',
    path: '/login',
    private: false
  },
  {
    name: 'Entities',
    path: '/entities',
    private: true
  }
]

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <App routes={routes} />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
