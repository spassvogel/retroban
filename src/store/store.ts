import { configureStore } from '@reduxjs/toolkit'
import tiles from './reducers/tiles'
import gameStatus from './reducers/gameStatus'
import undo from './reducers/undo'
import gamestatusMiddleware from './middlewares/gameStatusMiddleware'
import undoMiddleware from './middlewares/undoMiddleware'

const store = configureStore({
  reducer: {
    tiles,
    gameStatus,
    undo
  },
  middleware: [
    gamestatusMiddleware,
    undoMiddleware
  ],
  devTools: true
})

export default store

export type SokobanStoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
