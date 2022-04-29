import React, { useEffect, useState } from 'react'
import Contacts from '../../store/contacts'
import Auth from '../../store//auth'
import { observer } from 'mobx-react-lite'
import './style.scss'
import ContactItem from '../../components/ContactItem/ContactItem'
import { useNavigate } from 'react-router-dom'

function Home() {
  let [name, setName] = useState('')
  let [search, setSearch] = useState('')

  const navigate = useNavigate()

  const logout = () => {
    Auth.logout()
    navigate('/login')
  }

  useEffect(() => {
    Contacts.getAll()
  }, [])

  useEffect(() => {
    Contacts.findContact(search)
  }, [search])

  return (
    <section className="home">
      <div className="home__header">
        <h3>Список Контактов</h3>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="search..."
        />
        <button onClick={logout}>LOGOUT</button>
      </div>
      <div className="home__create">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <button onClick={() => Contacts.createContact(name.trim())}>
          Create
        </button>
      </div>
      <div className="row">
        <div className="col">
          {Contacts.contacts.map((item) => {
            return <ContactItem key={item.id} contact={item} />
          })}
        </div>
      </div>
    </section>
  )
}

export default observer(Home)
