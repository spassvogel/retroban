import { useSelector } from "react-redux"
import { SokobanStoreState } from "../store/store"
import Button from "./Button"

import "./buttonRow.scss"

const ButtonRow = () => {
  const canUndo = useSelector<SokobanStoreState, number>((state) => state.undo.length) > 0

  return (
    <div className="button-row">
      <Button disabled={!canUndo}>Undo</Button>
      <Button>Reset</Button>
    </div>
  )
}

export default ButtonRow
