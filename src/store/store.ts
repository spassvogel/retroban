import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tiles, { TilesStoreState } from './reducers/tiles'
import gameStatus, { GameStatusState } from './reducers/gameStatus'
import undo from './reducers/undo'
import gamestatusMiddleware from './middlewares/gameStatusMiddleware'
import undoMiddleware from './middlewares/undoMiddleware'
import userAction, { UserActionState } from './reducers/userAction'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'

import createIdbStorage from '@piotr-cz/redux-persist-idb-storage'
import puzzleInfo from './reducers/puzzleInfo'

const configureStoreAndPersistor = (path: string) => {
  const persistConfig = {
    key: 'root',
    storage: createIdbStorage({name: `sokoban:${path}`, storeName: 'levels'}),
    serialize: false,
    deserialize: false,
  }
  const reducer = persistReducer(persistConfig, combineReducers({
    puzzleInfo,
    tiles,
    userAction,
    gameStatus,
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

export type SokobanStoreState = ReturnType<ReturnType<typeof configureStoreAndPersistor>['store']['getState']>
export type AppDispatch = ReturnType<typeof configureStoreAndPersistor>['store']['dispatch']
