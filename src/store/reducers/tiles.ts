import { Reducer } from "@reduxjs/toolkit";
import { peekNeighor } from "../../grid/utils/grid";
import { GO_DOWN, GO_LEFT, GO_RIGHT, GO_UP } from "../actions/tiles";
import { TilesAction } from "../actions/types";

export enum TileType { empty, wall,  floor,  dropzone }

export enum ObjectType { player, box }

export type TileObject = {
  tileIndex: number
  objectType: ObjectType
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
    tileIndex: 26,
    objectType: ObjectType.player
  }]
}

const tiles: Reducer<TilesStoreState, TilesAction> = (state = initial, action) => {
  switch (action.type) {
    case GO_UP: {
      const playerObject = state.objects.find((o) => o.objectType === ObjectType.player)
      if (!playerObject) return state
      const destination = peekNeighor(playerObject.tileIndex, state.columns, state.static.length / state.columns, 0, -1)
      if (destination === undefined) return state
      console.log(`(wouter) upNeighbor`, destination);
      return {
        ...state,
        objects: state.objects.map((o) => {
          if (o === playerObject) {
            return {
              ...o,
              tileIndex: destination
            }
          }
          return o
        })
      }
    }
    case GO_RIGHT: {
      const playerObject = state.objects.find((o) => o.objectType === ObjectType.player)
      if (!playerObject) return state
      const destination = peekNeighor(playerObject.tileIndex, state.columns, state.static.length / state.columns, 1, 0)
      if (destination === undefined) return state
      console.log(`(wouter) rightNeighbor`, destination);
      return {
        ...state,
        objects: state.objects.map((o) => {
          if (o === playerObject) {
            return {
              ...o,
              tileIndex: destination
            }
          }
          return o
        })
      }
    }
    case GO_DOWN: {
      const playerObject = state.objects.find((o) => o.objectType === ObjectType.player)
      if (!playerObject) return state
      const destination = peekNeighor(playerObject.tileIndex, state.columns, state.static.length / state.columns, 0, 1)
      if (destination === undefined) return state
      console.log(`(wouter) downNeighbor`, destination);
      return {
        ...state,
        objects: state.objects.map((o) => {
          if (o === playerObject) {
            return {
              ...o,
              tileIndex: destination
            }
          }
          return o
        })
      }
    }
    case GO_LEFT: {
      const playerObject = state.objects.find((o) => o.objectType === ObjectType.player)
      if (!playerObject) return state
      const destination = peekNeighor(playerObject.tileIndex, state.columns, state.static.length / state.columns, -1, 0)
      console.log(`(wouter) leftNeighbor`, destination);
      if (destination === undefined) return state
      console.log(`(wouter) downNeighbor`, destination);
      return {
        ...state,
        objects: state.objects.map((o) => {
          if (o === playerObject) {
            return {
              ...o,
              tileIndex: destination
            }
          }
          return o
        })
      }
    }
  }
  return state
}

export default tiles
