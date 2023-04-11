import { Reducer } from "redux"
import { SokobanAction } from "../actions/types"
import { Direction } from "../utils/moves"
import { GO_UP, GO_RIGHT, GO_DOWN, GO_LEFT } from "../actions/tiles"

export type UserActionState = {
  lastAttemptedAction?: Direction
  lastAttemptedActionTime?: number
}

const initial: UserActionState = {
  lastAttemptedAction: GO_RIGHT
}

// This reducer keeps track of the last attempted user action

// eslint-disable-next-line default-param-last
const userActionReducer: Reducer<UserActionState, SokobanAction> = (state = initial, action) => {
  switch (action.type) {
    case GO_UP:
    case GO_RIGHT:
    case GO_DOWN:
    case GO_LEFT: {
      return {
        lastAttemptedAction: action.type,
        lastAttemptedActionTime: new Date().getTime()
      }
    }
  }
  return state
}

export default userActionReducer
