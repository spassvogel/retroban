import { AnyAction } from "@reduxjs/toolkit"
import { SokobanAction, UndoAction } from "./types"

export const ADD_UNDO = 'ADD_UNDO'
export const REMOVE_UNDO = 'REMOVE_UNDO'
export const UNDO = 'UNDO'


export const undo = (): UndoAction<SokobanAction> => ({
  type: UNDO,
})

// adds undo action to the top of the stack
// typically gets executed by `undoMiddleware`
export const addUndo = <TPuzzleAction extends AnyAction>(payload: TPuzzleAction[]) => ({
  type: ADD_UNDO,
  payload,
})

// removes all actions in the payload from the undo stack
// typically gets executed by `undoMiddleware`
export const removeUndo = <TPuzzleAction extends AnyAction>(payload: TPuzzleAction[]) => ({
  type: REMOVE_UNDO,
  payload,
})
