import { Reducer } from "@reduxjs/toolkit";
import { INIT_GAME_DATA, RESET_PUZZLE } from "../actions/game";
import { MOVE } from "../actions/tiles";
import { GameAction, ReplayAction, TilesAction } from "../actions/types";
import { SET_PLAYHEAD } from "../actions/replay";
import { peekNeighor } from "../../grid/utils/grid";
import { DIRECTION, Direction } from "../utils/moves";

export enum TileType { empty, wall,  floor,  dropzone }

export enum ObjectType { player, box }

export type TileObject = {
  tileIndex: number
  objectType: ObjectType
  initialTileIndex: number
}

export type TilesStoreState = {
  columns: number
  static: TileType[]
  objects: TileObject[]
}

const initial: TilesStoreState = {
  columns: 0,
  static: [],
  objects: []
}

const tiles: Reducer<TilesStoreState, TilesAction | GameAction | ReplayAction> = (state = initial, action) => {
  switch (action.type) {
    case INIT_GAME_DATA: {
      return action.payload.tiles
    }

    case MOVE: {
      return {
        ...state,
        objects: state.objects.map((o) => {
          if (o.objectType === ObjectType.player) {
            return {
              ...o,
              tileIndex: action.destination
            }
          }
          if (action.boxMove?.from === o.tileIndex) {
            return {
              ...o,
              tileIndex: action.boxMove.to
            }
          }
          return o
        })
      }
    }

    case RESET_PUZZLE: {
      // Puts everything back into its original location
      return {
        ...state,
        objects: state.objects.map((o) => {
          return {
            ...o,
            tileIndex: o.initialTileIndex
          }
        })
      }
    }

    case SET_PLAYHEAD: {
      let from = action.payload.previousPlayhead
      let objects = [...state.objects]
      if (action.payload.previousPlayhead > action.payload.value) {
        // reset the puzzle and build up from there
        from = 0
        objects = objects.map((o) => {
          return {
            ...o,
            tileIndex: o.initialTileIndex
          }
        })
      }
      // Step through the actions and replay them
      while (from < action.payload.value) {
        const currentMove = action.payload.actions[from]
        const boxMoved = currentMove === currentMove.toUpperCase()

        const { x, y } = DIRECTION[currentMove.toLowerCase() as Direction]
        const player = objects.find((o) => o.objectType === ObjectType.player)

        if (player) {
          const destination = peekNeighor(player.tileIndex, state.columns, state.static.length / state.columns, x, y)
          let boxDestination: number | undefined
          if (boxMoved) {
            boxDestination = peekNeighor(player.tileIndex, state.columns, state.static.length / state.columns, x * 2, y * 2)
          }

          objects = objects.map((o) => {
            if (o === player && destination != undefined) {
              return {
                ...o,
                tileIndex: destination
              }
            }
            if (o.objectType === ObjectType.box && o.tileIndex === destination && boxDestination !== undefined) {
              return {
                ...o,
                tileIndex: boxDestination
              }
            }
            return o
          })
        }

        from++
      }
      return {
        ...state,
        objects
      }
    }
  }
  return state
}

export default tiles
