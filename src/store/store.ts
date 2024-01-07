import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tiles from './reducers/tiles'
import gameStatus from './reducers/gameStatus'
import undo from './reducers/undo'
import settings from './reducers/settings'
import gamestatusMiddleware from './middlewares/gameStatusMiddleware'
import undoMiddleware from './middlewares/undoMiddleware'
import userAction from './reducers/userAction'
import puzzleInfo from './reducers/puzzleInfo'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import { getPersistConfig } from './indexedDB'

const configureStoreAndPersistor = (path: string) => {
  const persistConfig = getPersistConfig(path)
  const reducer = persistReducer(persistConfig, combineReducers({
    puzzleInfo,
    tiles,
    userAction,
    gameStatus,
    settings,
    undo
  }))

  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
      }),
      gamestatusMiddleware,
      undoMiddleware
    ],
    devTools: true
  })


  const persistor = persistStore(store)
  return {
    store,
    persistor
  }
}
export default configureStoreAndPersistor

export const configureDemoStore = () => {
  const reducer = combineReducers({
    puzzleInfo,
    tiles,
    userAction,
    gameStatus,
    settings,
    undo
  })

  const store = configureStore({
    reducer,
    devTools: true
  })

  return store
}


export type DemoStore = ReturnType<typeof configureDemoStore>
type Store = ReturnType<typeof configureStoreAndPersistor>['store']
export type SokobanStoreState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
