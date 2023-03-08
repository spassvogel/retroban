import { GameStatusType } from "../reducers/gameStatus"
import { GameStatusAction } from "./types"

export const SET_GAME_STATUS = 'SET_GAME_STATUS'

export const setGameStatus = (status: GameStatusType): GameStatusAction => ({
  type: SET_GAME_STATUS,
  payload: {
    status
  }
})

