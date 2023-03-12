import { Reducer } from "@reduxjs/toolkit";
import { INIT_GAME_DATA, RESET_PUZZLE } from "../actions/game";
import { GO_DOWN, GO_LEFT, GO_RIGHT, GO_UP, MOVE_BOX } from "../actions/tiles";
import { GameAction, TilesAction } from "../actions/types";
import { calculateMove } from "../utils/moves";

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


const tiles: Reducer<TilesStoreState, TilesAction | GameAction> = (state = initial, action) => {
  switch (action.type) {
    case INIT_GAME_DATA: {
      return action.payload.tiles
    }

    case GO_UP:
    case GO_RIGHT:
    case GO_DOWN:
    case GO_LEFT: {

      const move = calculateMove(state, action.type)
      if (!move.player) {
        return state
      }

      return {
        ...state,
        objects: state.objects.map((o) => {
          if (move.player && o === move.player.object) {
            return {
              ...o,
              tileIndex: move.player?.destination
            }
          }
          if (move.box && move.box.object === o) {
            return {
              ...o,
              tileIndex: move.box.destination
            }
          }
          return o
        })
      }
    }
    case MOVE_BOX: {
      // Only used for undo
      return {
        ...state,
        objects: state.objects.map((o) => {
          if (o.objectType === ObjectType.box && o.tileIndex === action.payload.from) {
            return {
              ...o,
              tileIndex: action.payload.to
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
  }
  return state
}

export default tiles
