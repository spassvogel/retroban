import { useDispatch, useSelector } from "react-redux"
import { resetPuzzle } from "../store/actions/game"
import { undo } from "../store/actions/undo"
import { GameStatusType, GameStatus } from "../store/reducers/gameStatus"
import { AppDispatch, SokobanStoreState } from "../store/store"
import Button from "./Button"

import "./buttonRow.scss"

const ButtonRow = () => {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)
  const canUndo = useSelector<SokobanStoreState, number>((state) => state.undo.length) > 0

  const handleUndo = () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(undo())
    }
  }
  const handleReset = () => {
    dispatch(resetPuzzle())
  }


  return (
    <div className="button-row">
      <Button
        disabled={!canUndo}
        onClick={handleUndo}
      >
          Undo
      </Button>
      <Button
        onClick={handleReset}
      >
        Reset
      </Button>
    </div>
  )
}

export default ButtonRow
