import { ReplayAction } from "./types"

export const SET_PLAYHEAD = 'SET_PLAYHEAD'

export const setPlayhead = (value: number, previousPlayhead: number, actions: string): ReplayAction => ({
  type: SET_PLAYHEAD,
  payload: {
    value,
    previousPlayhead,
    actions
  }
})

