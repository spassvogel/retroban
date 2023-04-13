import Grid from './grid/Grid'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import ButtonRow from './ui/button-bar/ButtonBar'
import { ChangeEvent, useEffect } from 'react'
import { loadGameData as loadGameData, parseXML, startGame } from './api/gameData'
import useSwipeableActions from './hooks/useSwipeableActions'
import LevelSelector from './ui/level-selector/LevelSelector'
import levelJSON from '../levels.json'

import './game.scss'

type Props = {
  gameData?: string
}
const Game = ({ gameData }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const handlers = useSwipeableActions()

  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    loadGameData(e.target.value, dispatch)
  }

  useEffect(() => {
    if (gameData) {
      // received gameData as prop, use this
      const asXML = parseXML(gameData)
      startGame(asXML, dispatch)
    } else {
      loadGameData(levelJSON.levels[0].path, dispatch)
    }
  }, [dispatch, gameData])

  return (
    <div className="App" {...handlers}>
      <LevelSelector onLevelChange={handleLevelChange} />
      <Grid />
      <ButtonRow />
    </div>
  )
}

export default Game
