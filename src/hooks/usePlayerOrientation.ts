import { useSelector } from "react-redux"
import { SokobanStoreState } from "../store/store"
import { DOWN, Direction, LEFT, RIGHT, UP } from "../store/utils/moves"

const DIRECTIONMAP = {
  [RIGHT]: 'east',
  [DOWN]: 'south',
  [LEFT]: 'west',
  [UP]: 'north'
}

// Returns the orientation the player is supposed to have
export const usePlayerOrientation = () => {
  const actions = useSelector<SokobanStoreState, string>(state => state.userAction.actions)
  if (!actions.length) {
    return DIRECTIONMAP[RIGHT]
  }

  const directionLastMove: Direction = actions[actions.length - 1].toLowerCase() as Direction
  return DIRECTIONMAP[directionLastMove]
}
