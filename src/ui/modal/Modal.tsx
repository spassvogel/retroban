import { useEffect, useRef } from "react"
import "./modal.scss"

type Props = {
  onProceed?: () => void
  onClose?: () => void
  children?: React.ReactNode
}

const Modal = ({
  onClose,
  children,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    dialog.showModal()
    return () => {
      dialog.close()
    }
  }, []);

  const proceedAndClose = () => {
    // onProceed()
    // onClose()
  };

  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <dialog ref={ref} onCancel={onClose} onClick={onClose} className="modal">
      <div onClick={preventAutoClose}>
        {children}
        <div>
          <button onClick={proceedAndClose}>Proceed</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  )
}

export default Modal
