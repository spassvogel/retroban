import { useState } from "react"
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
