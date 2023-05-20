import { useSelector } from "react-redux"
import { SokobanStoreState } from "../store/store"
import { Direction, RIGHT } from "../store/utils/moves"
import { UserActionState } from "../store/reducers/userAction"

// Returns the orientation the player is supposed to have
export const usePlayerOrientation = (): Direction => {
  const { actions, playhead} = useSelector<SokobanStoreState, UserActionState>(state => state.userAction)
  if (!actions.length) {
    return RIGHT
  }

  if (actions.length === playhead) {
    return actions[playhead - 1].toLowerCase() as Direction
  }
  return actions[playhead].toLowerCase() as Direction
}
