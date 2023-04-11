import Grid from './grid/Grid'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import ButtonRow from './ui/button-bar/ButtonBar'
import { ChangeEvent, useEffect } from 'react'
import { loadGame } from './api/gameData'
import useSwipeableActions from './hooks/useSwipeableActions'
import LevelSelector from './ui/level-selector/LevelSelector'

import './App.css'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handlers = useSwipeableActions()

  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    loadGame(e.target.value, dispatch)
  }

  useEffect(() => {
    loadGame('level1', dispatch)
  }, [dispatch])

  return (
    <div className="App" {...handlers}>
      <LevelSelector onLevelChange={handleLevelChange} />
      <Grid />
      <ButtonRow />
    </div>
  )
}

export default App
