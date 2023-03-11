import { GameStatusType } from "../reducers/gameStatus"
import { GameAction } from "./types"

export const SET_GAME_STATUS = 'SET_GAME_STATUS'
export const RESET_PUZZLE = 'RESET_PUZZLE'

export const setGameStatus = (status: GameStatusType): GameAction => ({
  type: SET_GAME_STATUS,
  payload: {
    status
  }
})

export const resetPuzzle = (): GameAction => ({
  type: RESET_PUZZLE,
})

