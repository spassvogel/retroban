import { Reducer } from "redux"
import { SokobanAction } from "../actions/types"
import { MOVE } from "../actions/tiles"
import { UNDO } from "../actions/undo"
import { INIT_GAME_DATA, RESET_PUZZLE } from "../actions/game"
import { SET_PLAYHEAD } from "../actions/replay"

export type UserActionState = {
  actions: string,
  time?: number,
  playhead: number,
  solutions: string[]
}

const initial: UserActionState = {
  actions: '',
  playhead: 0,
  solutions: []
}


// eslint-disable-next-line default-param-last
const userActionReducer: Reducer<UserActionState, SokobanAction> = (state = initial, action) => {
  switch (action.type) {
    case INIT_GAME_DATA: {
      return {
        ...state,
        solutions: action.payload.solutions ?? []
      }
    }

    case MOVE: {
      if (action.skipUndo) return state

      // uppercase means a box was moved!
      const direction = action.boxMove ? action.direction.toUpperCase() : action.direction
      return {
        ...state,
        actions: state.actions + direction,
        time: new Date().getTime(),
        playhead: state.actions.length + 1
      }
    }

    case UNDO: {
      return {
        ...state,
        actions: state.actions.substring(0, state.actions.length - 1),
        playhead: state.playhead - 1
      }
    }

    case SET_PLAYHEAD: {
      return {
        ...state,
        playhead: action.payload.value
      }
    }

    case RESET_PUZZLE: {
      return {
        ...state,
        actions: '',
        playhead: 0,
      }
    }
  }
  return state
}

export default userActionReducer
