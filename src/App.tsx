import Grid from './grid/Grid'
import useKeyPress from './hooks/useKeyPress'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, SokobanStoreState } from './store/store'
import { goDown, goLeft, goRight, goUp } from './store/actions/tiles'
import { GameStatus, GameStatusType } from './store/reducers/gameStatus'
import { undo } from './store/actions/undo'
import ButtonRow from './ui/ButtonRow'

import './App.css'
import { useEffect } from 'react'
import { loadGame } from './api/gameData'
import useGameActions from './hooks/useGameActions'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handlers = useGameActions()

  useEffect(() => {
    loadGame('level1', dispatch)
  }, [])

  return (
    <div className="App" {...handlers}>
      <Grid />
      <ButtonRow />
    </div>
  )
}

export default App
