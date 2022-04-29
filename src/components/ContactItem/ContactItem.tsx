import { FC, useState } from 'react'
import Contacts from '../../store/contacts'
import { observer } from 'mobx-react-lite'
import './style.scss'
import userImg from './icons/user-img.png'
import EditContact from '../EditContact/EditContact'
import { IContact } from '../../models/response/ContactResponse'

interface ContactProps {
  contact: IContact
}

const ContactItem: FC<ContactProps> = ({ contact }) => {
  let [showEdit, setShowEdit] = useState(false)
  let [text, setText] = useState('')

  const changeShowEdit = (bol: boolean) => {
    setShowEdit(bol)
  }

  const handleClick = (id: string) => {
    Contacts.changeName(id, text.trim())
    setShowEdit(false)
  }

  return (
    <div className="col">
      <div className="home-item">
        <img src={userImg} className="home-item__avatar" alt="image User" />
        <h3 className="home-item__title">{contact.name}</h3>
        <div className="home-item__box">
          <button onClick={() => setShowEdit(true)} className="home-item__edit">
            <svg
              fill="#5357B6"
              width="14"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            onClick={() => Contacts.removeContact(contact.id)}
            className="home-item__delete"
          >
            <svg
              fill="#ED6368"
              width="12"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
        {showEdit && (
          <EditContact showEdit={showEdit} onChange={changeShowEdit}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
              onClick={() => handleClick(contact.id)}
              className="home-item__edit-btn"
            >
              Edit
            </button>
          </EditContact>
        )}
      </div>
    </div>
  )
}

export default observer(ContactItem)
