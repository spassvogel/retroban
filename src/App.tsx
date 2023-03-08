import { useState } from 'react'
import Grid from './grid/Grid'
import useKeyPress from './hooks/useKeyPress'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store/store'
import { goDown, goLeft, goRight, goUp } from './store/actions/tiles'
import { GameStatus, GameStatusType } from './store/reducers/gameStatus'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector<RootState, GameStatusType>(state => state.gameStatus.status)

  useKeyPress('ArrowUp', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goUp())
    }
  }, [status])
  useKeyPress('ArrowRight', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goRight())
    }
  }, [status])
  useKeyPress('ArrowDown', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goDown())
    }
  }, [status])
  useKeyPress('ArrowLeft', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(goLeft())
    }
  }, [status])
  return (
    <div className="App">
      <Grid />
    </div>
  )
}

export default App
