import { FC } from 'react'
import './style.scss'

interface EditContactProps {
  showEdit: boolean
  onChange: Function
  children?: React.ReactChild | React.ReactNode
}

const EditContact: FC<EditContactProps> = ({
  showEdit,
  onChange,
  children,
}) => {
  return (
    <div className="modal-edit">
      <div className="modal-edit__backdrop" onClick={() => onChange(false)} />
      <div className="modal-edit__dialog">{children}</div>
    </div>
  )
}

export default EditContact
