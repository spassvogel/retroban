import { useEffect } from "react"
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

  // useEffect(() => {
  //   const handle = (e: KeyboardEvent) => {
  //     switch (e.key) {
  //       case 'ArrowUp':
  //         goUpAction()
  //         break
  //       case 'ArrowRight':
  //         goRightAction()
  //         break
  //       case 'ArrowDown':
  //         goDownAction()
  //         break
  //       case 'ArrowLeft':
  //         goLeftAction()
  //         break
  //     }
  //   }
  //   window.addEventListener('keyup', handle)
  //   return () => {
  //     window.removeEventListener('keyup', handle)
  //   }
  // }, [goDownAction, goLeftAction, goRightAction, goUpAction])

  useKeyPress('ArrowUp', goUpAction, [status, 'ArrowUp', goUpAction])
  useKeyPress('ArrowRight', goRightAction, [status, 'ArrowRight', goRightAction])
  useKeyPress('ArrowDown', goDownAction, [status, 'ArrowDown', goDownAction])
  useKeyPress('ArrowLeft', goLeftAction, [status, 'ArrowLeft', goLeftAction])
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
