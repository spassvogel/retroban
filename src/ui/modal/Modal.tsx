import { PropsWithChildren, useEffect, useRef } from "react"
import "./modal.scss"
import ReactDOM, { createPortal } from "react-dom"

type Props = PropsWithChildren<{
  onProceed?: () => void
  onClose?: () => void
  before?: React.ReactNode
  footer?: React.ReactNode
}>

const Modal = ({
  onClose,
  children,
  before,
  footer,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null)

  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return createPortal(
    <div onClick={onClose} className="modal-backdrop">
      {before}
      <div onClick={preventAutoClose} className="modal-body">
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-footer">
          {footer}
        </div>
      </div>
    </div>
  , document.body)
}

export default Modal
