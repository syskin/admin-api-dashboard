import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout/App';

import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from 'react-redux'
import configureStore from "./store";
import { entities } from './config/entities'

const { store, persistor } = configureStore();

const routes = [
  {
    name: 'Home',
    path: "/",
    private: true
  },
  {
    name: 'Login',
    path: "/login",
    private: false
  },
  {
    name: 'Entity',
    path: "/entity",
    private: true
  },
];

entities.forEach(entity => {
  routes.push({
    name: entity.name,
    path: `/entity/${entity.name.toLowerCase()}`,
    private: true
  })
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <App routes={routes} />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
