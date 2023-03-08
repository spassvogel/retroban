import { configureStore } from '@reduxjs/toolkit'
import tiles from './reducers/tiles'
import gameStatus from './reducers/gameStatus'
import gamestatusMiddleware from './middlewares/gamestatusMiddleware'

const store = configureStore({
  reducer: {
    tiles,
    gameStatus
  },
  middleware: [
    gamestatusMiddleware
  ],
  devTools: true
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
