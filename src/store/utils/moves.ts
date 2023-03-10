import { peekNeighor } from "../../grid/utils/grid"
import { GO_UP, GO_RIGHT, GO_DOWN, GO_LEFT } from "../actions/tiles"
import { ObjectType, TileObject, TilesStoreState, TileType } from "../reducers/tiles"


const DIRECTION = {
  [GO_UP]: { x: 0, y: -1},
  [GO_RIGHT]: { x: 1, y: 0},
  [GO_DOWN]: { x: 0, y: 1},
  [GO_LEFT]: { x: -1, y: 0},
}

type Direction = typeof GO_UP | typeof GO_RIGHT | typeof GO_DOWN | typeof GO_LEFT
type MoveObjectResult = {
  object: TileObject
  destination: number
}
type MoveResult = {
  player?: MoveObjectResult
  box?: MoveObjectResult
}

// Calculates the next position of the player and a moved box (if any)
// @return player and box can be undefined, in which case they did not move
export const calculateMove = (state: TilesStoreState, direction: Direction): MoveResult => {
  const result: MoveResult = {
    player: calculatePlayerMove(state, direction),
  }

  if (result.player) {
    const box = state.objects.find((o) => result.player && o.tileIndex === result.player.destination && o.objectType === ObjectType.box)
    if (!box) {
      return result
    }
    const { x, y } = DIRECTION[direction]

    // We're trying to push a box
    const destination = peekNeighor(result.player.object.tileIndex, state.columns, state.static.length / state.columns, x * 2, y * 2)
    if (!destination) {
      return result
    }
    if (state.static[destination] === TileType.wall) {
      // The box would hit a wall, can't continue the move
      return {}
    }
    if (state.objects.find((o) => o.tileIndex === destination && o.objectType === ObjectType.box)){
      // Moving the box would hit another box, can't continue the move
      return {}
    }

    result.box = {
      object: box,
      destination
    }
  }

  return result
}

const calculatePlayerMove = (state: TilesStoreState, direction: Direction): MoveObjectResult | undefined => {
  const player = state.objects.find((o) => o.objectType === ObjectType.player)
  if (!player) return

  const { x, y } = DIRECTION[direction]
  const destination = peekNeighor(player.tileIndex, state.columns, state.static.length / state.columns, x, y)
  if (destination === undefined) {
    return
  }
  if (state.static[destination] === TileType.wall) {
    // Hit the wall, can't continue
    return
  }

  return {
    object: player,
    destination
  }
}
