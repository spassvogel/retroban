import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetPuzzle } from "../store/actions/game"
import { goUp, goRight, goDown, goLeft } from "../store/actions/tiles"
import { undo } from "../store/actions/undo"
import { GameStatusType, GameStatus } from "../store/reducers/gameStatus"
import { AppDispatch, SokobanStoreState } from "../store/store"

const useGameActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)

  const goUpAction = useCallback(() => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goUp())
    }
  }, [status])

  const goRightAction = useCallback(() => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goRight())
    }
  }, [status])

  const goDownAction = useCallback(() => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goDown())
    }
  }, [status])

  const goLeftAction  = useCallback(() => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goLeft())
    }
  }, [status])

  const undoAction = useCallback(() => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(undo())
    }
  }, [status])

   const resetAction = useCallback(() => {
    dispatch(resetPuzzle())
  }, [])

  return {
    goUpAction,
    goRightAction,
    goDownAction,
    goLeftAction,
    undoAction,
    resetAction
  }
}

export default useGameActions
