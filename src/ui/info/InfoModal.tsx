import { Provider, useSelector } from "react-redux"
import Modal from "../modal/Modal"
import DemoGame from "./DemoGame"
import { useEffect, useState } from "react"
import { type DemoStore, configureDemoStore, SokobanStoreState } from "../../store/store"
import { type PuzzleInfoState } from "../../store/reducers/puzzleInfo"
import { BrowserView, MobileView } from "react-device-detect"
import useKeyPress from "../../hooks/useKeyPress"

import './infoModal.scss'

type Props = {
  onClose: () => void
}

const InfoModal = ({ onClose }: Props) => {
  const puzzleInfo = useSelector<SokobanStoreState, PuzzleInfoState>(state => state.puzzleInfo)
  const [store, setStore] = useState<DemoStore>()
  useKeyPress('Escape', onClose)

  useEffect(() => {
    const newStore = configureDemoStore()
    setStore(newStore)
  }, [])

  if (!store) {
    return null
  }

  return (
    <Modal onClose={onClose} bodyClassName="info-modal-body">
      <h2>Retroban</h2>
      <section>
        <h3>How to play</h3>
        <p>
          Sokoban is a classic puzzle game in which the player pushes boxes around a maze to specific locations. The rules are simple, but the game can become quite challenging.
          The goal of Sokoban is to push all the boxes onto designated target locations. Each target location must be covered by a box to complete a level.
        </p>
        <p>
          Use the arrow buttons or <BrowserView renderWithFragment>the keys on your keyboard</BrowserView><MobileView renderWithFragment>use swiping gestures</MobileView> to move.
        </p>
        <div className="info-modal-body__demo-game-container">
          <Provider store={store}>
            <DemoGame />
          </Provider>
        </div>
        <h3>Tips</h3>
        <p>
          Plan your moves in advance. Take a moment to observe the entire puzzle and plan your strategy. Avoid potential bottlenects where a box might get stuck against a wall or corner.
          If you find yourself stuck or in a seemingly unwinnable situation, don't hesitate to use the 'undo' feature or restart the level. There is also the 'Solve' button, but use this as a last resort!
        </p>
        <p>
          By planning your moves in advance, you'll develop a better understanding of the puzzle dynamics and improve your problem-solving skills in Sokoban.
          As you gain experience, you'll become more adept at quickly assessing puzzles and devising efficient solutions.
        </p>
        <h3>About this level</h3>
        <h4>{puzzleInfo.name}</h4>
        <p>{puzzleInfo.source}</p>
        <div>
          <a href={puzzleInfo.sourceURL} target='_blank' rel="noreferrer">
            {puzzleInfo.sourceURL}
          </a>
        </div>
        { puzzleInfo.author && (
          <div>
            By
            <a href={`mailto:${puzzleInfo.authorEmail}`}>
              {` ${puzzleInfo.author}`}
            </a>
          </div>
        )}
        <div onClick={onClose} className="info-modal-body__button-close">
          close window
        </div>
      </section>
    </Modal>
  )
}

export default InfoModal

