import { Provider } from "react-redux"
import Modal from "../modal/Modal"
import DemoGame from "./DemoGame"
import { useEffect, useState } from "react"
import { type DemoStore, configureDemoStore } from "../../store/store"

import './infoModal.scss'

type Props = {
  onClose: () => void
}

const InfoModal = ({ onClose }: Props) => {

  const [store, setStore] = useState<DemoStore>()

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
        <p></p>
        <div>
          <Provider store={store}>
            <DemoGame />
          </Provider>
        </div>
      </section>
    </Modal>
  )
}

export default InfoModal