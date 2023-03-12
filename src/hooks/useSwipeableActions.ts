import { useSwipeable } from "react-swipeable"
import useGameActions from "./useGameActions"

const useSwipeableActions = () => {

  const {
    goUpAction,
    goRightAction,
    goDownAction,
    goLeftAction,
  } = useGameActions()

  const swipeableHandlers = useSwipeable({
    onSwipedUp: goUpAction,
    onSwipedRight: goRightAction,
    onSwipedDown: goDownAction,
    onSwipedLeft: goLeftAction,
  })

  return swipeableHandlers
}

export default useSwipeableActions
