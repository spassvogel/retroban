import { SokobanAction } from '../actions/types'
import { Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { AppDispatch, SokobanStoreState } from '../store'
import { addUndo, UNDO } from '../actions/undo'
import { MOVE } from '../actions/tiles'
import { ObjectType } from '../reducers/tiles'

const undoMiddleware: Middleware = (storeApi: MiddlewareAPI<Dispatch, SokobanStoreState>) => (next: AppDispatch) => (action: SokobanAction) => {
  switch (action.type) {
    case MOVE: {
      if (action.skipUndo) break
      const player = storeApi.getState().tiles.objects.find(o => o.objectType === ObjectType.player)
      const undoActions: SokobanAction[] = []

      if (!player) break

      // undoActions.push( {
      //   type: MOVE,
      //   destination: player.tileIndex,
      //   boxMove: action.boxMove && {
      //     from: action.boxMove.to,
      //     to: action.boxMove.from
      //   }
      // })

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
