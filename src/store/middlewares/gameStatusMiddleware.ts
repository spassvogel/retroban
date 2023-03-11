import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit"
import { SokobanAction } from "../actions/types"
import { GameStatus } from "../reducers/gameStatus"
import { AppDispatch, SokobanStoreState } from "../store"
import { ObjectType, TileType } from "../reducers/tiles"
import { setGameStatus } from "../actions/game"

const gameStatusMiddleware: Middleware = (storeApi: MiddlewareAPI<AppDispatch, SokobanStoreState>) => (next: AppDispatch) => (action: SokobanAction) => {

  const result = next(action)
  const state = storeApi.getState()
  if (state.gameStatus.status === GameStatus.IS_PLAYING) {
    if (state.tiles.objects.every((o) => o.objectType !== ObjectType.box || state.tiles.static[o.tileIndex] === TileType.dropzone )) {
      storeApi.dispatch(setGameStatus(GameStatus.IS_SOLVED))
    }
  }

  return result
}

export default gameStatusMiddleware
