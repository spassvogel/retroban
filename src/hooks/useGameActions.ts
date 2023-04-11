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
  }, [dispatch, status])

  const goRightAction = useCallback(() => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goRight())
    }
  }, [dispatch, status])

  const goDownAction = useCallback(() => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goDown())
    }
  }, [dispatch, status])

  const goLeftAction  = useCallback(() => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goLeft())
    }
  }, [dispatch, status])

  const undoAction = useCallback(() => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(undo())
    }
  }, [dispatch, status])

   const resetAction = useCallback(() => {
    dispatch(resetPuzzle())
  }, [dispatch])

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
