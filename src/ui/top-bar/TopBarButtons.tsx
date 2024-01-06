import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type SokobanStoreState } from "../../store/store"
import { solvePuzzle } from "../../store/actions/game"
import { useDimensions } from "../../hooks/useDimensions"
import { zoomIn, zoomOut } from "../../store/actions/settings"
import { GameStatusType } from "../../store/reducers/gameStatus"
import InfoButton from "./buttons/InfoButton"

type Props = {
  gotoNextLevel: () => void
}
const TopBarButtons = ({ gotoNextLevel }: Props) => {
  const solutions = useSelector<SokobanStoreState, string[]>((store) => store.userAction.solutions)
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)
  const canSolve = solutions?.length > 0 && status !== "IS_SOLVED"
  const canGoToNext = status === "IS_SOLVED"
  const dispatch = useDispatch<AppDispatch>()

  const handleSolve = () => {
    dispatch(solvePuzzle(solutions[0]))
  }

  const { canZoomIn, canZoomOut } = useDimensions()
  const canZoom = canZoomIn || canZoomOut

  const handleZoomIn = () => {
    dispatch(zoomIn())
  }

  const handleZoomOut = () => {
    dispatch(zoomOut())
  }



  return (
    <>
      { canZoom && (
        <>
          <button
            className="button-small"
            disabled={!canZoomOut}
            onClick={handleZoomOut}
          >
              -
          </button>
          <button
            className="button-small"
            disabled={!canZoomIn}
            onClick={handleZoomIn}
          >
              +
          </button>
        </>
      )}
      <InfoButton />
      { canGoToNext && <button onClick={gotoNextLevel} className="button-small">next</button> }
      { canSolve && <button onClick={handleSolve} className="button-small">solve</button> }
    </>
  )
}

export default TopBarButtons
