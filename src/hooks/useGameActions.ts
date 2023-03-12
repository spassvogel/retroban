import { useDispatch, useSelector } from "react-redux"
import { useSwipeable } from "react-swipeable"
import { goUp, goRight, goDown, goLeft } from "../store/actions/tiles"
import { undo } from "../store/actions/undo"
import { GameStatusType, GameStatus } from "../store/reducers/gameStatus"
import { AppDispatch, SokobanStoreState } from "../store/store"
import useKeyPress from "./useKeyPress"

const useGameActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)

  const goUpAction = () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goUp())
    }
  }
  const goRightAction = () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goRight())
    }
  }
  const goDownAction = () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goDown())
    }
  }

  const goLeftAction = () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goLeft())
    }
  }

  const swipeableHandlers = useSwipeable({
    onSwipedUp: goUpAction,
    onSwipedRight: goRightAction,
    onSwipedDown: goDownAction,
    onSwipedLeft: goLeftAction,
  })

  useKeyPress('ArrowUp', goUpAction, [status])
  useKeyPress('ArrowRight', goRightAction, [status])
  useKeyPress('ArrowDown', goDownAction, [status])
  useKeyPress('ArrowLeft', goLeftAction, [status])

  useKeyPress('z', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(undo())
    }
  }, [status])

  return swipeableHandlers
}

export default useGameActions
