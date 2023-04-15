import Grid from './grid/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, SokobanStoreState } from './store/store'
import ButtonRow from './ui/button-bar/ButtonBar'
import { ChangeEvent, useEffect, useState } from 'react'
import { loadGameData as loadGameData, parseXML, startGame } from './api/gameData'
import useSwipeableActions from './hooks/useSwipeableActions'
import LevelSelector from './ui/level-selector/LevelSelector'
import levelJSON from '../levels.json'
import ConfettiExplosion from 'react-confetti-explosion';

import './game.scss'

type Props = {
  path: string
  gameData?: string
}
const Game = ({ path }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const isInitialized = useSelector<SokobanStoreState, boolean>((store) => store.puzzleInfo.isInitialized)
  const rehydrated = useSelector<SokobanStoreState, boolean>((store) => store._persist.rehydrated)
  const handlers = useSwipeableActions()

  const [c, setC] = useState(false)
  useEffect(() => {
    // if (c) {
      setTimeout(() => {
        setC(!c)
      }, 3000)
    // }
  }, [c])

  useEffect(() => {
    // If the store was rehydrated but not initialized,
    // load the xml data and populate the store
    if (rehydrated && !isInitialized) {
      loadGameData(path, dispatch)
    }
  }, [dispatch, isInitialized, path, rehydrated])

  // useEffect(() => {
  //   if (gameData) {
  //     // received gameData as prop, use this
  //     const asXML = parseXML(gameData)
  //     startGame(asXML, dispatch)
  //   } else {
  //     // loadGameData(levelJSON.levels[0].path, dispatch)
  //   }
  // }, [dispatch, gameData])

  if (!isInitialized) {
    return (
      <div className="game">
        loading level data...
      </div>
    )
  }

  return (
    <div className="game" {...handlers} onClick={() => {setC(true)}}>
      <Grid />
      <ButtonRow />
      {/* {c && <ConfettiExplosion className="confetti" />} */}
    </div>
  )
}

export default Game
