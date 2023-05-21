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
        setDismissed(false)
      }, SHOW_DELAY)
    }
    if (status === GameStatus.IS_PLAYING) {
      setDismissed(true)
    }
    return () => clearTimeout(timeout)
  }, [status])

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
