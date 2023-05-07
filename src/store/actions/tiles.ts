import { TilesStoreState } from "../reducers/tiles"
import { AppDispatch } from "../store"
import { Direction, calculateMove } from "../utils/moves"
import { TilesAction } from "./types"

export const MOVE = 'MOVE' // moves the player and possibly a box

// todo: refactor using thunk!
export const attemptAction = (dispatch: AppDispatch, tiles: TilesStoreState, direction: Direction) => {
  const move = calculateMove(tiles, direction)
  if (!move.player) {
    // Illegal move, don't do anything
    return
  }
  const destination = move.player.destination
  if (!move.box) {
    // Did not move a box, just the player
    dispatch({
      type: MOVE,
      destination
    })
    return
  }
  dispatch({
    type: MOVE,
    destination,
    boxMove: {
      from: move.box.object.tileIndex,
      to: move.box.destination
    }
  })
}
