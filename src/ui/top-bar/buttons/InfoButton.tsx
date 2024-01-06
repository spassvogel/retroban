import { useState } from "react"
import Modal from "../../modal/Modal"

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
        className="button-small"
        onClick={handleClick}
      >
        ⓘ
      </button>
      { open && (
        <Modal onClose={handleClose}>
          <h2>Well done!</h2>
          <section>
            <div>
              {`You completed this level in moves.`}
            </div>
          </section>
        </Modal>
      )}
    </>
  )
}

export default InfoButton
