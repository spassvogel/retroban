import { configureStore } from '@reduxjs/toolkit'
import tiles from './reducers/tiles'

const store = configureStore({
  reducer: {
    tiles
  },
  devTools: true
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
