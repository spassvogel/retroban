import { GameDataSokoban } from "../../api/transform/transformXML"
import { GameStatusType } from "../reducers/gameStatus"
import { GameAction } from "./types"

export const INIT_GAME_DATA = 'INIT_GAME_DATA'
export const SET_GAME_STATUS = 'SET_GAME_STATUS'
export const RESET_PUZZLE = 'RESET_PUZZLE'
export const SOLVE_PUZZLE = 'SOLVE_PUZZLE'

export const initGameData = (data: GameDataSokoban): GameAction => ({
  type: INIT_GAME_DATA,
  payload: data
})

export const setGameStatus = (status: GameStatusType): GameAction => ({
  type: SET_GAME_STATUS,
  payload: {
    status
  }
})

export const resetPuzzle = (): GameAction => ({
  type: RESET_PUZZLE,
})

export const solvePuzzle = (solution: string): GameAction => ({
  type: SOLVE_PUZZLE,
  payload: {
    solution
  }
})

