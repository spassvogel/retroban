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
    console.log('going up')
  })
  useKeyPress('ArrowRight', () => {
    dispatch(goRight())
    console.log('going right')
  })
  useKeyPress('ArrowDown', () => {
    dispatch(goDown())
    console.log('going down')
  })
  useKeyPress('ArrowLeft', () => {
    dispatch(goLeft())
    console.log('going left')
  })
  return (
    <div className="App">
      <Grid />
    </div>
  )
}

export default App
