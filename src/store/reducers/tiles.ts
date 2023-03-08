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
    tileIndex: 18,
    objectType: ObjectType.player
   }, {
    tileIndex: 19,
    objectType: ObjectType.box
   }, {
    tileIndex: 28,
    objectType: ObjectType.box
   }, {
    tileIndex: 36,
    objectType: ObjectType.box
   }, {
    tileIndex: 49,
    objectType: ObjectType.box
   }, {
    tileIndex: 51,
    objectType: ObjectType.box
   }, {
    tileIndex: 52,
    objectType: ObjectType.box
   }, {
    tileIndex: 53,
    objectType: ObjectType.box
  }]
}

const DIRECTION = {
  [GO_UP]: { x: 0, y: -1},
  [GO_RIGHT]: { x: 1, y: 0},
  [GO_DOWN]: { x: 0, y: 1},
  [GO_LEFT]: { x: -1, y: 0},
}

const tiles: Reducer<TilesStoreState, TilesAction> = (state = initial, action) => {
  switch (action.type) {
    case GO_UP:
    case GO_RIGHT:
    case GO_DOWN:
    case GO_LEFT: {
      const playerObject = state.objects.find((o) => o.objectType === ObjectType.player)
      if (!playerObject) return state

      const { x, y } = DIRECTION[action.type]
      const destination = peekNeighor(playerObject.tileIndex, state.columns, state.static.length / state.columns, x, y)
      if (destination === undefined) {
        return state
      }
      if (state.static[destination] === TileType.wall) {
        // Hit the wall, can't continue
        return state
      }
      const boxObject = state.objects.find((o) => o.tileIndex === destination && o.objectType === ObjectType.box)
      let boxDestination: number | undefined
      if (boxObject) {
        // We're trying to push a box
        boxDestination = peekNeighor(playerObject.tileIndex, state.columns, state.static.length / state.columns, x * 2, y * 2)
        if (!boxDestination) {
          return state
        }
        if (state.static[boxDestination] === TileType.wall) {
          // The box would hit a wall, can't continue
          return state
        }
        if (state.objects.find((o) => o.tileIndex === boxDestination && o.objectType === ObjectType.box)){
          // Moving the box would hit another box, can't continue
          return state
        }
      }
      return {
        ...state,
        objects: state.objects.map((o) => {
          if (o === playerObject) {
            return {
              ...o,
              tileIndex: destination
            }
          }
          if (o === boxObject && boxDestination !== undefined) {
            return {
              ...o,
              tileIndex: boxDestination
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
