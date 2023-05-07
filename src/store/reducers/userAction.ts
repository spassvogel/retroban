import { Reducer } from "redux"
import { SokobanAction } from "../actions/types"
import { MOVE } from "../actions/tiles"

export type UserActionState = {
  // lastAttemptedAction?: Direction
  lastAttemptedActionTime?: number
}

const initial: UserActionState = {
  // lastAttemptedAction: MOVE
}

// This reducer keeps track of the last attempted user action

// eslint-disable-next-line default-param-last
const userActionReducer: Reducer<UserActionState, SokobanAction> = (state = initial, action) => {
  switch (action.type) {
    case MOVE:
      return {
        // lastAttemptedAction: action.type,
        lastAttemptedActionTime: new Date().getTime()
      }
    // }
  }
  return state
}

export default userActionReducer
