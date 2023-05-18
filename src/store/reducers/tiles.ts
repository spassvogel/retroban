import { Reducer } from "@reduxjs/toolkit";
import { INIT_GAME_DATA, RESET_PUZZLE } from "../actions/game";
import { MOVE } from "../actions/tiles";
import { GameAction, ReplayAction, TilesAction } from "../actions/types";
import { SET_PLAYHEAD } from "../actions/replay";

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
      if (action.payload.previousPlayhead > action.payload.value) {
        console.log('going back in time')
      }
      if (action.payload.previousPlayhead < action.payload.value) {
        console.log('going forward in time')
      }
      return state
    }
  }
  return state
}

export default tiles
