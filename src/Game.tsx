import Grid from './grid/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, SokobanStoreState } from './store/store'
import ButtonRow from './ui/button-bar/ButtonBar'
import { useEffect } from 'react'
import { loadGameData as loadGameData, parseXML, startGame } from './api/gameData'
import useSwipeableActions from './hooks/useSwipeableActions'
import { LEVEL_PREVIEW } from './App'
import CompledState from './ui/completed/CompletedState'

import './game.scss'
import { solvePuzzle } from './store/actions/game'

type Props = {
  path: string
  gameData?: string
  gotoNextLevel: () => void
}

const Game = ({ gameData, path, gotoNextLevel }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const isInitialized = useSelector<SokobanStoreState, boolean>((store) => store.puzzleInfo.isInitialized)
  const rehydrated = useSelector<SokobanStoreState, boolean>((store) => store._persist.rehydrated)
  const handlers = useSwipeableActions()

  useEffect(() => {
    // If the store was rehydrated but not initialized,
    // load the xml data and populate the store
    if (path === LEVEL_PREVIEW && gameData) {
      // received gameData as prop, use this
      const asXML = parseXML(gameData)
      startGame(asXML, dispatch)
    } else {
      if (rehydrated && !isInitialized) {
        loadGameData(path, dispatch)
      }
    }
  }, [dispatch, gameData, isInitialized, path, rehydrated])
  const solutions = useSelector<SokobanStoreState, string[]>((store) => store.userAction.solutions)
  const canSolve = solutions.length > 0

  const handleSolve = () => {
    dispatch(solvePuzzle(solutions[0]))
  }

  if (!isInitialized) {
    return (
      <div className="game">
        loading level data...
      </div>
    )
  }

  return (
    <>
    { canSolve && <button onClick={handleSolve}>solve</button> }

      <div className="game" {...handlers}>
        <Grid />
        <ButtonRow />
        <CompledState gotoNextLevel={gotoNextLevel} />
      </div>
    </>
  )
}

export default Game
