import { GameDataSokoban } from "../../api/transform/transformXML"
import { GameStatusType } from "../reducers/gameStatus"
import { GameAction, ReplayAction } from "./types"

export const SET_PLAYHEAD = 'SET_PLAYHEAD'

export const setPlayhead = (value: number): ReplayAction => ({
  type: SET_PLAYHEAD,
  payload: value
})

