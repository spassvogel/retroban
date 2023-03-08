import { useState } from 'react'
import Grid from './grid/Grid'
import useKeyPress from './hooks/useKeyPress'
import './App.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import { goDown, goLeft, goRight, goUp } from './store/actions/tiles'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useKeyPress('ArrowUp', () => {
    dispatch(goUp())
  })
  useKeyPress('ArrowRight', () => {
    dispatch(goRight())
  })
  useKeyPress('ArrowDown', () => {
    dispatch(goDown())
  })
  useKeyPress('ArrowLeft', () => {
    dispatch(goLeft())
  })
  return (
    <div className="App">
      <Grid />
    </div>
  )
}

export default App
