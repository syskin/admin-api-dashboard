import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import authReducer from './reducers/authReducer'
import testReducer from './reducers/testReducer'

const reducers = combineReducers({
  auth: persistReducer<any, any>(
    {
      key: 'auth',
      storage
    },
    authReducer
  ),
  test: testReducer
})

function configureStore(initialState = {}) {
  const store = createStore(reducers, applyMiddleware(thunk))

  const persistor = persistStore(store)

  return { store, persistor }
}
export type RootState = ReturnType<typeof reducers>
export default configureStore
