import Grid from './grid/Grid'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import ButtonRow from './ui/ButtonBar'

import './App.css'
import { useEffect } from 'react'
import { loadGame } from './api/gameData'
import useSwipeableActions from './hooks/useSwipeableActions'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handlers = useSwipeableActions()

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
