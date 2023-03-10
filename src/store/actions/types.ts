import { GameStatusType } from "../reducers/gameStatus"
import { SET_GAME_STATUS } from "./gameStatus"
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

export type GameStatusAction = {
  type: typeof SET_GAME_STATUS
  payload: {
    status: GameStatusType,
  },
}

export type UndoAction<TPuzzleAction> = {
  type: typeof ADD_UNDO
  payload: TPuzzleAction[]
} | {
  type: typeof REMOVE_UNDO
  payload: TPuzzleAction[]
} | {
  type: typeof UNDO
// } | {
//   type: typeof RESET_PUZZLE
}

export type UndoableAction = {
  skipUndo?: boolean
}

export type SokobanAction = TilesAction | GameStatusAction | UndoAction<TilesAction>
