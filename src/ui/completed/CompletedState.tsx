import { useEffect, useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import { useSelector } from 'react-redux'
import { GameStatus, GameStatusType } from '../../store/reducers/gameStatus'
import { SokobanStoreState } from '../../store/store'
import Modal from '../modal/Modal'
import ProgressSlider from './ProgressSlider'

import './completed-state.scss'

type Props = {
  gotoNextLevel: () => void
}

const SHOW_DELAY = 500

const CompledState = ({ gotoNextLevel }: Props) => {
  const [dismissed, setDismissed] = useState(true)
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)
  const moves = useSelector<SokobanStoreState, number>(state => state.userAction.actions.length)
  const actions = useSelector<SokobanStoreState, string>(state => state.userAction.actions)
  const time = useSelector<SokobanStoreState, number>(state => state.userAction.time ?? 0)

  const handleClose = () => {
    setDismissed(true)
  }

  const handleNextLevel = () => {
    setDismissed(true)
    gotoNextLevel()
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (status === GameStatus.IS_SOLVED) {
      timeout = setTimeout(() => {
        const wasFinishedBefore = Date.now() - time > 1000 // finished in the last second
        setDismissed(wasFinishedBefore)
      }, SHOW_DELAY)
    }
    if (status === GameStatus.IS_PLAYING) {
      setDismissed(true)
    }
    return () => clearTimeout(timeout)
  }, [status, time])

  if (status === GameStatus.IS_SOLVED) { // delete this
    console.log(actions)
  }

  if (status !== GameStatus.IS_SOLVED) {
    return null
  }


  return (
    <div className='completed-state'>
      { !dismissed && (
        <Modal
          before={<ConfettiExplosion className="confetti" force={0.8} duration={3000} particleCount={250} width={1600} /> }
          footer={(
            <>
              <button onClick={handleNextLevel}>Next level</button>
              <button onClick={handleClose}>View puzzle</button>
            </>
          )}
          onClose={handleClose}
        >
          <h2>Well done!</h2>
          <section>
            <div>
              {`You completed this level in ${moves} moves.`}
            </div>
            <div className="completed-state__modal-subtext">
              Play the next level or replay your solution.
            </div>
          </section>
        </Modal>
      )}
      <ProgressSlider />
    </div>
  )
}

export default CompledState
