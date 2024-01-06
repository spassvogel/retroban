import { PropsWithChildren } from "react"
import "./modal.scss"
import { createPortal } from "react-dom"

type Props = PropsWithChildren<{
  onProceed?: () => void
  onClose?: () => void
  before?: React.ReactNode
  footer?: React.ReactNode
  bodyClassName?: string
}>

const Modal = ({
  onClose,
  children,
  before,
  footer,
  bodyClassName
}: Props) => {
  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return createPortal(
    <div onClick={onClose} className="modal-backdrop">
      {before}
      <div onClick={preventAutoClose} className={`modal-body ${bodyClassName}`}>
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
