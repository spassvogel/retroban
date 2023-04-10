import { useSelector } from "react-redux"
import useGameActions from "../../hooks/useGameActions"
import useKeyPress from "../../hooks/useKeyPress"
import { GameStatusType } from "../../store/reducers/gameStatus"
import { SokobanStoreState } from "../../store/store"
import Button from "./Button"

import "./buttonBar.scss"

const ButtonBar = () => {
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)
  const canUndo = useSelector<SokobanStoreState, number>((state) => state.undo.length) > 0

  const {
    goUpAction,
    goRightAction,
    goDownAction,
    goLeftAction,
    undoAction,
    resetAction
  } = useGameActions()

  useKeyPress('ArrowUp', goUpAction, [status])
  useKeyPress('ArrowRight', goRightAction, [status])
  useKeyPress('ArrowDown', goDownAction, [status])
  useKeyPress('ArrowLeft', goLeftAction, [status])
  useKeyPress('z', undoAction);

  return (
    <div className="button-bar">
      <div className="button-bar__row">
        <Button
          className="button-bar__bigger-button"
          disabled={!canUndo}
          onClick={undoAction}
        >
          ↻ <span>Undo</span>
        </Button>

        <Button onClick={goUpAction}>↑</Button>

        <Button
          className="button-bar__bigger-button"
          onClick={resetAction}
        >
          ♽ <span>Reset</span>
        </Button>
      </div>
      <div className="button-bar__row">
        <Button onClick={goLeftAction}>←</Button>
        <Button onClick={goDownAction}>↓</Button>
        <Button onClick={goRightAction}>→</Button>
      </div>
    </div>
  )
}

export default ButtonBar