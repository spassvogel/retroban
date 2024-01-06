import { useEffect, useState } from "react"
import Modal from "../../modal/Modal"
import { DemoStore, Store, configureDemoStore } from "../../../store/store"
import { Provider } from "react-redux"
import Game from "../../../Game"
import { LEVEL_PREVIEW } from "../../../App"
import DemoGame from "../../info/DemoGame"
import InfoModal from "../../info/InfoModal"


const InfoButton = () => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <>
      <button
        className="button-small button-info"
        onClick={handleClick}
      >
        ⓘ
      </button>
      { open && (
        <InfoModal onClose={handleClose} />
      )}
    </>
  )
}

export default InfoButton
