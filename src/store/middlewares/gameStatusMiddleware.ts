import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit"
import { SokobanAction } from "../actions/types"
import { GameStatus } from "../reducers/gameStatus"
import { AppDispatch, RootState } from "../store"
import { ObjectType, TileType } from "../reducers/tiles"

const gameStatusMiddleware: Middleware = (storeApi: MiddlewareAPI<AppDispatch, RootState>) => (next: AppDispatch) => (action: SokobanAction) => {

  const state = storeApi.getState()
  const result = next(action)
  if (state.gameStatus.status === GameStatus.IS_PLAYING) {
    console.log('playing..')
    if (state.tiles.objects.every((o) => o.objectType !== ObjectType.box || state.tiles.static[o.tileIndex] === TileType.dropzone )) {
      console.log('we are done!')
    }
  }

  return result
}

export default gameStatusMiddleware
