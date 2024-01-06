import Grid from '../../grid/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, SokobanStoreState } from '../../store/store'
import { useEffect, useRef, useState } from 'react'
import { parseXML, startGame } from '../../api/gameData'

import '../../game.scss'
import { attemptAction } from '../../store/actions/tiles'
import { TilesStoreState } from '../../store/reducers/tiles'
import { Direction } from '../../store/utils/moves'
import { resetPuzzle } from '../../store/actions/game'

const demoGameData = `
<puzzle type="Sokoban" width="6"> 
  <tiles> 
    <static> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="floor" /> 
      <tile type="floor" /> 
      <tile type="floor" /> 
      <tile type="dropzone" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="floor" /> 
      <tile type="floor" /> 
      <tile type="floor" /> 
      <tile type="floor" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="floor" /> 
      <tile type="floor" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="dropzone" /> 
      <tile type="wall" /> 
      <tile type="empty" /> 
      <tile type="empty" /> 
      <tile type="empty" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="wall" /> 
      <tile type="empty" /> 
      <tile type="empty" /> 
    </static> 
    <objects> 
      <object tileIndex="20" type="player" /> 
       <object tileIndex="14" type="box" /> 
       <object tileIndex="15" type="box" /> 
    </objects> 
  </tiles> 
</puzzle>
`

const solution = 'luurDDuurrdLullddrUluRR'
const STEP_TIME = 300
const WAIT_BEFORE_MOVING = 5 // amount of 'steps' to wait before starting moving
const WAIT_AFTER_COMPLETE = 10 // amount of 'steps' to wait after completing level to reset

const DemoGame = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isInitialized = useSelector<SokobanStoreState, boolean>((store) => store.puzzleInfo.isInitialized)
  const tiles = useSelector<SokobanStoreState, TilesStoreState>(state => state.tiles)
  // const [nextSolutionMove, setNextSolutionMove] = useState(-WAIT_BEFORE_MOVING)
  const nextSolutionMove = useRef(0)

  useEffect(() => {
    const asXML = parseXML(demoGameData)
    startGame(asXML, dispatch)
  }, [dispatch])

  useEffect(() => {

    const determineAction = () => {
      if (solution[nextSolutionMove.current]) {
        return setTimeout(() => {
          const direction = solution[nextSolutionMove.current].toLowerCase() as Direction
          nextSolutionMove.current++
          attemptAction(dispatch, tiles, direction)
        }, STEP_TIME * ((nextSolutionMove.current === 0) ? WAIT_BEFORE_MOVING : 1))
      } else if (nextSolutionMove.current === solution.length) {
        return setTimeout(() => {
          dispatch(resetPuzzle())
          nextSolutionMove.current = 0
        }, STEP_TIME * WAIT_AFTER_COMPLETE)
      }
    }
    
    const timeout = determineAction()

    // const timeout = setTimeout(() => {
    //   if (solution[nextSolutionMove.current]) {
    //     const direction = solution[nextSolutionMove.current].toLowerCase() as Direction
    //     nextSolutionMove.current++
    //     attemptAction(dispatch, tiles, direction)
    //   } else if (nextSolutionMove.current === solution.length) {
    //     dispatch(resetPuzzle())
    //     nextSolutionMove.current = 0
    //   }
    // }, STEP_TIME)

    return () => {
      clearTimeout(timeout)
    }
  }, [dispatch, tiles])

  // useEffect(() => {
  //   if (solution[nextSolutionMove]) {
  //     const direction = solution[nextSolutionMove].toLowerCase() as Direction
  //     attemptAction(dispatch, tiles, direction)
  //   }
  //   const timeout = setTimeout(() => {
  //     if (nextSolutionMove === solution.length + WAIT_AFTER_COMPLETE) {
  //       dispatch(resetPuzzle())
  //       setNextSolutionMove(-WAIT_BEFORE_MOVING)
  //     } else {
  //       setNextSolutionMove(nextSolutionMove + 1)
  //     }
  //   }, STEP_TIME)

  //   return () => {
  //     clearTimeout(timeout)
  //   }
  // }, [dispatch, tiles, nextSolutionMove])


  if (!isInitialized) {
    return (
      <div className="game">
        loading level data...
      </div>
    )
  }

  return (
    <>
      <div className="demo-game">
        <Grid />
      </div>
    </>
  )
}

export default DemoGame
