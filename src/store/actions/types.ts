import { GameDataSokoban } from "../../api/transform/transformXML"
import { GameStatusType } from "../reducers/gameStatus"
import { INIT_GAME_DATA, RESET_PUZZLE, SET_GAME_STATUS } from "./game"
import { GO_UP, GO_RIGHT, GO_DOWN, GO_LEFT, MOVE_BOX } from "./tiles"
import { ADD_UNDO, REMOVE_UNDO, UNDO } from "./undo"


export type MoveBoxPayload = {
  from: number
  to: number
}

export type TilesAction = {
  type: typeof GO_UP
} & UndoableAction | {
  type: typeof GO_RIGHT
} & UndoableAction | {
  type: typeof GO_DOWN
} & UndoableAction | {
  type: typeof GO_LEFT
} & UndoableAction | {
  type: typeof MOVE_BOX
  payload: MoveBoxPayload
}

export type GameAction = {
  type: typeof INIT_GAME_DATA
  payload: GameDataSokoban,
} | {
  type: typeof SET_GAME_STATUS
  payload: {
    status: GameStatusType,
  }
} | {
  type: typeof RESET_PUZZLE
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

export type UndoableAction = {
  skipUndo?: boolean
}

export type SokobanAction = TilesAction | GameAction | UndoAction<TilesAction>
