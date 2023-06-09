import { GameDataSokoban } from "../../api/transform/transformXML"
import { GameStatusType } from "../reducers/gameStatus"
import { ZoomLevel } from "../reducers/settings"
import { Direction } from "../utils/moves"
import { INIT_GAME_DATA, RESET_PUZZLE, SET_GAME_STATUS, SOLVE_PUZZLE } from "./game"
import { SET_PLAYHEAD } from "./replay"
import { SET_ZOOM_LEVEL, ZOOM_IN, ZOOM_OUT } from "./settings"
import { MOVE } from "./tiles"
import { ADD_UNDO, REMOVE_UNDO, UNDO } from "./undo"

export type MoveBoxPayload = {
  from: number
  to: number
}

export type TilesAction = {
  type: typeof MOVE
  direction: Direction
  destination: number
  boxMove?: MoveBoxPayload
} & UndoableAction

export type GameAction = {
  type: typeof INIT_GAME_DATA
  payload: GameDataSokoban,
} | {
  type: typeof SET_GAME_STATUS
  payload: {
    status: GameStatusType,
  }
} | {
  type: typeof SOLVE_PUZZLE
  payload: {
    solution: string,
  }
} | {
  type: typeof RESET_PUZZLE
}

export type ReplayAction = {
  type: typeof SET_PLAYHEAD
  payload: {
    value: number,
    previousPlayhead: number,
    actions: string
  }
}

export type UndoAction<TPuzzleAction> = {
  type: typeof ADD_UNDO
  payload: TPuzzleAction[]
} | {
  type: typeof REMOVE_UNDO
  payload: TPuzzleAction[]
} | {
  type: typeof UNDO
}

export type SettingsAction = {
  type: typeof ZOOM_IN,
} | {
  type: typeof ZOOM_OUT,
} | {
  type: typeof SET_ZOOM_LEVEL,
  payload: ZoomLevel
}

export type UndoableAction = {
  skipUndo?: boolean
}

export type SokobanAction = TilesAction | GameAction | UndoAction<TilesAction> | ReplayAction
