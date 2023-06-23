import Button from "./Button"
import { deleteLevel } from "../../store/indexedDB"
import { useSelector } from "react-redux"
import { SokobanStoreState } from "../../store/store"

const DebugRow = () => {
  const actions = useSelector<SokobanStoreState, string>(state => state.userAction.actions)
  const deleteIndexDb = async () => {
    const currentLevel = localStorage.getItem('currentLevel')
    if (currentLevel) {
      await deleteLevel(currentLevel)
      location.reload()
    }
  }

  const printSolution = () => {
    console.log(actions)
  }

  if (import.meta.env.PROD) {
    return null
  }

  return (
    <div className="button-bar__row button-bar__row--debug">
      <Button
        className=""
        onClick={deleteIndexDb}
      >
        clear indexdb entry
      </Button>
      <Button
        className=""
        onClick={printSolution}
      >
        print actions
      </Button>
    </div>
  )
}

export default DebugRow
