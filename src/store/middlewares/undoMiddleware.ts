import { SokobanAction } from '../actions/types'
import { Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { AppDispatch, SokobanStoreState } from '../store'
import { addUndo, UNDO } from '../actions/undo'
import { GO_DOWN, GO_LEFT, GO_RIGHT, GO_UP, MOVE_BOX, goLeft } from '../actions/tiles'
import { calculateMove } from '../utils/moves'

const INVERSE: { [key: string]: typeof GO_DOWN | typeof GO_LEFT | typeof GO_UP | typeof GO_RIGHT} = {
  [GO_UP]: GO_DOWN,
  [GO_RIGHT]: GO_LEFT,
  [GO_DOWN]: GO_UP,
  [GO_LEFT]: GO_RIGHT
}

const undoMiddleware: Middleware = (storeApi: MiddlewareAPI<Dispatch, SokobanStoreState>) => (next: AppDispatch) => (action: SokobanAction) => {
  switch (action.type) {
    case GO_UP:
    case GO_RIGHT:
    case GO_DOWN:
    case GO_LEFT: {
      if (action.skipUndo) break
      const tileState = storeApi.getState().tiles
      const move = calculateMove(tileState, action.type)
      const undoActions: SokobanAction[] = []

      if (move.player) {
        undoActions.push({
          type: INVERSE[action.type]
        })

        if (move.box) {
          undoActions.push({
            type: MOVE_BOX,
            payload: {
              from: move.box.destination,
              to: move.box.object.tileIndex
            }
          })
        }
      }
      if (undoActions.length) {
        storeApi.dispatch(addUndo<SokobanAction>(undoActions))
      }
      break
    }

    case UNDO: {
      const state = storeApi.getState()
      const undoActions = state.undo[0]
      // fire the top action off the stack
      // the undoReducer shifts it off the list
      if (undoActions) {
        undoActions.forEach((undoAction) => { storeApi.dispatch(undoAction) })
      }
      break
    }

    default:
      break
  }

  next(action)
}

export default undoMiddleware
