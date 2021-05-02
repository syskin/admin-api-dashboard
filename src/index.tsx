import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout/App';

import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from 'react-redux'
import configureStore from "./store";

const { store, persistor } = configureStore();

const routes = [
  {
    name: 'Home',
    path: "/",
    private: true,
    exact: true
  },
  {
    name: 'Login',
    path: "/login",
    private: false,
    default: true
  },
  {
    name: 'Entity',
    path: "/entity",
    private: true
  },
  {
    name: 'Users',
    path: "/entity/users",
    private: true
  },
  {
    name: 'Recipes',
    path: "/entity/recipes",
    private: true
  },
];

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
