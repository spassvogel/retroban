import { Reducer } from 'redux'

import { ADD_UNDO, REMOVE_UNDO, UNDO } from '../actions/undo'
import { SokobanAction } from '../actions/types'
import { INIT_GAME_DATA, RESET_PUZZLE } from '../actions/game'

const MAX_UNDO = 22

// the undo reducer for sudoku puzzles
const undoReducer: Reducer<SokobanAction[][], SokobanAction> = (state = [], action) => {
  switch (action.type) {
    // Adds an undo action to the stack
    case ADD_UNDO: {
      // set `skipUndo` on all actions
      const allActions = action.payload.map((a) => ({
        ...a,
        skipUndo: true,
      }))

      return [
        allActions,
        ...state,
      ].slice(0, MAX_UNDO)
    }

    // // Removes all actions in the payload from the stack
    // case REMOVE_UNDO: {
    //   return state.reduce<SokobanAction[][]>((acc, value) => {
    //     return acc
    //   }, [])
    // }

    case UNDO: {
      // shift the first action off the stack
      // the undoMiddleware has already executed the action at this point
      return state.filter((_, i) => i > 0) ?? []
    }

    case INIT_GAME_DATA:
    case RESET_PUZZLE: {
      return []
    }

    default:
      return state
  }
}

export default undoReducer
