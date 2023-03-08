import { GameStatusType } from "../reducers/gameStatus"
import { SET_GAME_STATUS } from "./gameStatus"
import { GO_UP, GO_RIGHT, GO_DOWN, GO_LEFT } from "./tiles"


export type TilesAction = {
  type: typeof GO_UP
} | {
  type: typeof GO_RIGHT
} | {
  type: typeof GO_DOWN
} | {
  type: typeof GO_LEFT
}

export type GameStatusAction = {
  type: typeof SET_GAME_STATUS
  payload: {
    status: GameStatusType,
  },
}

export type SokobanAction = TilesAction | GameStatusAction
