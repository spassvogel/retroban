import Grid from './grid/Grid'
import useKeyPress from './hooks/useKeyPress'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, SokobanStoreState } from './store/store'
import { goDown, goLeft, goRight, goUp } from './store/actions/tiles'
import { GameStatus, GameStatusType } from './store/reducers/gameStatus'
import { undo } from './store/actions/undo'
import ButtonRow from './ui/ButtonRow'

import './App.css'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)

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
  useKeyPress('z', () => {
    if (status === GameStatus.IS_PLAYING) {
      dispatch(undo())
    }
  }, [status])

  return (
    <div className="App">
      <Grid />
      <ButtonRow />
    </div>
  )
}

export default App
