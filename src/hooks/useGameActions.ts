import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetPuzzle } from "../store/actions/game"
import { attemptAction } from "../store/actions/tiles"
import { undo } from "../store/actions/undo"
import { GameStatusType, GameStatus } from "../store/reducers/gameStatus"
import { SokobanStoreState } from "../store/store"
import { Dispatch } from "@reduxjs/toolkit"
import { calculateMove } from "../store/utils/moves"
import { TilesStoreState } from "../store/reducers/tiles"

const COOLDOWN_TIME = 100
const useGameActions = () => {
  const dispatch = useDispatch<Dispatch>()
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)
  const tiles = useSelector<SokobanStoreState, TilesStoreState>(state => state.tiles)
  const lastAttemptedActionTime = useSelector<SokobanStoreState, number>(state => state.userAction.lastAttemptedActionTime ?? 0)

  const goUpAction = useCallback(() => {
    if (Date.now() - lastAttemptedActionTime < COOLDOWN_TIME) {
      return
    }
    if (status === GameStatus.IS_PLAYING) {
      attemptAction(dispatch, tiles, 'UP')
    }
  }, [dispatch, lastAttemptedActionTime, status, tiles])

  const goRightAction = useCallback(() => {
    if (Date.now() - lastAttemptedActionTime < COOLDOWN_TIME) {
      return
    }
    if (status === GameStatus.IS_PLAYING) {
      attemptAction(dispatch, tiles, 'RIGHT')
    }
  }, [dispatch, lastAttemptedActionTime, status, tiles])

  const goDownAction = useCallback(() => {
    if (Date.now() - lastAttemptedActionTime < COOLDOWN_TIME) {
      return
    }
    if (status === GameStatus.IS_PLAYING) {
      attemptAction(dispatch, tiles, 'DOWN')
    }
  }, [dispatch, lastAttemptedActionTime, status, tiles])

  const goLeftAction  = useCallback(() => {
    if (Date.now() - lastAttemptedActionTime < COOLDOWN_TIME) {
      return
    }
    if (status === GameStatus.IS_PLAYING) {
      attemptAction(dispatch, tiles, 'LEFT')
    }
  }, [dispatch, lastAttemptedActionTime, status, tiles])

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

