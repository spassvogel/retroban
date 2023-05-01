import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetPuzzle } from "../store/actions/game"
import { goUp, goRight, goDown, goLeft } from "../store/actions/tiles"
import { undo } from "../store/actions/undo"
import { GameStatusType, GameStatus } from "../store/reducers/gameStatus"
import { SokobanStoreState } from "../store/store"
import { Dispatch } from "@reduxjs/toolkit"

const COOLDOWN_TIME = 100
const useGameActions = () => {
  const dispatch = useDispatch<Dispatch>()
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)
  const lastAttemptedActionTime = useSelector<SokobanStoreState, number>(state => state.userAction.lastAttemptedActionTime ?? 0)

  const goUpAction = useCallback(() => {
    if (Date.now() - lastAttemptedActionTime < COOLDOWN_TIME) {
      return
    }
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goUp())
    }
  }, [dispatch, lastAttemptedActionTime, status])

  const goRightAction = useCallback(() => {
    if (Date.now() - lastAttemptedActionTime < COOLDOWN_TIME) {
      return
    }
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goRight())
    }
  }, [dispatch, lastAttemptedActionTime, status])

  const goDownAction = useCallback(() => {
    if (Date.now() - lastAttemptedActionTime < COOLDOWN_TIME) {
      return
    }
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goDown())
    }
  }, [dispatch, lastAttemptedActionTime, status])

  const goLeftAction  = useCallback(() => {
    if (Date.now() - lastAttemptedActionTime < COOLDOWN_TIME) {
      return
    }
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goLeft())
    }
  }, [dispatch, lastAttemptedActionTime, status])

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
