import { useDispatch, useSelector } from "react-redux"
import { goUp, goRight, goDown, goLeft } from "../store/actions/tiles"
import { undo } from "../store/actions/undo"
import { GameStatusType, GameStatus } from "../store/reducers/gameStatus"
import { AppDispatch, SokobanStoreState } from "../store/store"
import useKeyPress from "./useKeyPress"

const useGameActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)

  useKeyPress('ArrowUp', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goUp())
    }
  }, [status])

  useKeyPress('ArrowRight', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goRight())
    }
  }, [status])

  useKeyPress('ArrowDown', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goDown())
    }
  }, [status])

  useKeyPress('ArrowLeft', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goLeft())
    }
  }, [status])

  useKeyPress('z', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(undo())
    }
  }, [status])
}

export default useGameActions
