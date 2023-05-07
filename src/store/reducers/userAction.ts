import { Reducer } from "redux"
import { SokobanAction } from "../actions/types"
import { MOVE } from "../actions/tiles"
import { UNDO } from "../actions/undo"
import { RESET_PUZZLE } from "../actions/game"

export type UserActionState = {
  actions: string,
  time?: number,
}

const initial: UserActionState = {
  actions: ''
}


// eslint-disable-next-line default-param-last
const userActionReducer: Reducer<UserActionState, SokobanAction> = (state = initial, action) => {
  switch (action.type) {
    case MOVE: {
      if (action.skipUndo) return state

      // uppercase means a box was moved!
      const direction = action.boxMove ? action.direction.toUpperCase() : action.direction
      return {
        actions: state.actions + direction,
        time: new Date().getTime()
      }
    }
    case UNDO: {
      return {
        actions: state.actions.substring(0, state.actions.length - 1),
      }
    }
    case RESET_PUZZLE: {
      return {
        actions: '',
      }
    }
  }
  return state
}

export default userActionReducer
