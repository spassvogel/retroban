import { peekNeighor } from "../../grid/utils/grid"
import { ObjectType, TileObject, TilesStoreState, TileType } from "../reducers/tiles"

export const UP = 'UP'
export const RIGHT = 'RIGHT'
export const DOWN = 'DOWN'
export const LEFT = 'LEFT'


export const DIRECTION = {
  [UP]: { x: 0, y: -1},
  [RIGHT]: { x: 1, y: 0},
  [DOWN]: { x: 0, y: 1},
  [LEFT]: { x: -1, y: 0},
}

export type Direction = typeof UP | typeof RIGHT | typeof DOWN | typeof LEFT

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
export const calculateMove = (tiles: TilesStoreState, direction: Direction): MoveResult => {
  const result: MoveResult = {
    player: calculatePlayerMove(tiles, direction),
  }

  if (result.player) {
    const box = tiles.objects.find((o) => result.player && o.tileIndex === result.player.destination && o.objectType === ObjectType.box)
    if (!box) {
      return result
    }
    const { x, y } = DIRECTION[direction]

    // We're trying to push a box
    const destination = peekNeighor(result.player.object.tileIndex, tiles.columns, tiles.static.length / tiles.columns, x * 2, y * 2)
    if (!destination) {
      return result
    }
    if (tiles.static[destination] === TileType.wall) {
      // The box would hit a wall, can't continue the move
      return {}
    }
    if (tiles.objects.find((o) => o.tileIndex === destination && o.objectType === ObjectType.box)){
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
