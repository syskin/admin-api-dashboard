import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import authReducer from './reducers/authReducer'
import entityReducer from './reducers/entityReducer'

const reducers = combineReducers({
  auth: persistReducer(
    {
      key: 'auth',
      storage
    },
    authReducer
  ),
  entity: entityReducer
})

/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
function configureStore() {
  const store = createStore(reducers, applyMiddleware(thunk))
  const persistor = persistStore(store)

  return { store, persistor }
}

export const { store, persistor } = configureStore()

export type RootState = ReturnType<typeof reducers>
export default configureStore
