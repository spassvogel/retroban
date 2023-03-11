import { Reducer } from "@reduxjs/toolkit";
import { RESET_PUZZLE } from "../actions/game";
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

const _ = TileType.empty
const W = TileType.wall
const F = TileType.floor
const D = TileType.dropzone

export type TilesStoreState = {
  columns: number
  static: TileType[]
  objects: TileObject[]
}

const initial: TilesStoreState = {
  columns: 8,
  static: [
    _, _, W, W, W, W, W, _,
    W, W, W, F, F, F, W, _,
    W, D, F, F, F, F, W, _,
    W, W, W, F, F, D, W, _,
    W, D, W, W, F, F, W, _,
    W, F, W, F, D, F, W, W,
    W, F, F, D, F, F, D, W,
    W, F, F, F, D, F, F, W,
    W, W, W, W, W, W, W, W,

      // TileType.empty,    TileType.empty,    TileType.wall,     TileType.wall,     TileType.wall,     TileType.wall,     TileType.wall,     TileType.empty,
    // TileType.wall,     TileType.wall,     TileType.wall,     TileType.floor,    TileType.floor,    TileType.floor,    TileType.wall,     TileType.empty,
    // TileType.wall,     TileType.dropzone, TileType.floor,    TileType.floor,    TileType.floor,    TileType.floor,    TileType.wall,     TileType.empty,
    // TileType.wall,     TileType.wall,     TileType.wall,     TileType.floor,    TileType.floor,    TileType.dropzone, TileType.wall,     TileType.empty,
  ],
  objects: [{
    tileIndex: 18,
    objectType: ObjectType.player,
    initialTileIndex: 18
   }, {
    tileIndex: 19,
    objectType: ObjectType.box,
    initialTileIndex: 19
   }, {
    tileIndex: 28,
    objectType: ObjectType.box,
    initialTileIndex: 28
   }, {
    tileIndex: 36,
    objectType: ObjectType.box,
    initialTileIndex: 36
   }, {
    tileIndex: 49,
    objectType: ObjectType.box,
    initialTileIndex: 49
   }, {
    tileIndex: 51,
    objectType: ObjectType.box,
    initialTileIndex: 51
   }, {
    tileIndex: 52,
    objectType: ObjectType.box,
    initialTileIndex: 52
   }, {
    tileIndex: 53,
    objectType: ObjectType.box,
    initialTileIndex: 53
  }]
}


const tiles: Reducer<TilesStoreState, TilesAction | GameAction> = (state = initial, action) => {
  switch (action.type) {
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
