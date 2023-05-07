import { useEffect, useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
import { useSelector } from 'react-redux'
import { GameStatus, GameStatusType } from '../../store/reducers/gameStatus'
import { SokobanStoreState } from '../../store/store'
import Modal from '../modal/Modal'

type Props = {
  gotoNextLevel: () => void
}

const SHOW_DELAY = 500

const CompledState = ({ gotoNextLevel }: Props) => {
  const [dismissed, setDismissed] = useState(true)
  const status = useSelector<SokobanStoreState, GameStatusType>(state => state.gameStatus.status)

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

  if (dismissed) {
    return null
  }

  return (
    <div>
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
        Well done!
      </Modal>

    </div>
  )
}

export default CompledState
