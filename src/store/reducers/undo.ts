import { Reducer } from 'redux'

import { ADD_UNDO, REMOVE_UNDO, UNDO } from '../actions/undo'
import { SokobanAction, UndoAction } from '../actions/types'
const MAX_UNDO = 22

// the undo reducer for sudoku puzzles
const undoReducer: Reducer<SokobanAction[][], UndoAction<SokobanAction>> = (state = [], action) => {
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

    // Removes all actions in the payload from the stack
    case REMOVE_UNDO: {
      return state.reduce<SokobanAction[][]>((acc, value) => {
        // const actions = value.filter((a) => action.payload.indexOf(a as SudokuCellAction) === -1)
        // if any undo actions (besides SELECT_CELL and SELECT_CELLS) remain, keep it in the stack

        // if (actions.filter((a) => a.type !== selectionActionTypes.SELECT_CELL && a.type !== selectionActionTypes.SELECT_CELLS).length) {
        //   acc.push(actions)
        // }
        return acc
      }, [])
    }

    case UNDO: {
      // shift the first action off the stack
      // the undoMiddleware has already executed the action at this point
      return state.filter((_, i) => i > 0) ?? []
    }

    // case gameActionTypes.RESET_PUZZLE: {
    //   return []
    // }

    default:
      return state
  }
}

export default undoReducer
