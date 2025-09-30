import { useEffect, useRef, type RefObject } from "react"
import close_button_icon from "../../assets/close-button.svg"
import './Modal.css'

export type ModalProps = {
  title: string
  setTarget: (enable: boolean) => void
  target: boolean
  refer?: RefObject<HTMLDivElement | any> | undefined
  setRefer?: React.Dispatch<React.SetStateAction<RefObject<HTMLDivElement | undefined> | undefined>>
}

const Modal = ({ title, target, children, setRefer, setTarget }: React.PropsWithChildren<ModalProps>) => {

  const ref = useRef<HTMLDivElement | any>(null)

  useEffect(() => {
    if (setRefer) setRefer(ref)
  }, [])

  return (
    <div className="modal" ref={ref} style={
      {
        visibility: !target ? "hidden" : "visible",
        opacity: !target ? 0 : 1
      }}>
      <div className="modal__window">
        <div className="modal-title">
          <h2>{title}</h2>
          <div className="modal__close">
            <img src={close_button_icon} className="close-icon" onClick={() => setTarget(!target)} />
          </div>
        </div>
        <div className="modal-body">
          {
            children
          }
        </div>
      </div>
    </div>
  )
}

export default Modal
