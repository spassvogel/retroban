import { Reducer } from "@reduxjs/toolkit";
import { TilesAction } from "../actions/types";

export enum TileType { empty, wall,  floor,  dropzone }

export enum ObjectType { player, box }

export type Object = {
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
  objects: Object[]
}

const initial: TilesStoreState = {
  columns: 7,
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
  }]
}

const tiles: Reducer<TilesStoreState, TilesAction> = (state = initial, action) => {
  return state
}

export default tiles
