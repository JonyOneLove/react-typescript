import { makeObservable, observable, action, computed, runInAction } from 'mobx'
import { IContact } from '../models/response/ContactResponse'
import * as Server from '../services/ContacsService'
import { v4 as uuid } from 'uuid'

class ContactsStore {
  contacts = [] as IContact[]

  getAll = async () => {
    try {
      const res = await Server.getContacts()
      runInAction(() => {
        this.contacts = res.data
      })
    } catch (e: any) {
      console.log(e)
    }
  }

  removeContact = async (id: string) => {
    try {
      const res = await Server.removeContact(id)
      runInAction(() => {
        this.contacts = this.contacts.filter((item) => item.id !== id)
      })
    } catch (e) {
      console.log(e)
    }
  }

  changeName = async (id: string, newName: string) => {
    try {
      const res = await Server.changeName(id, newName)
      runInAction(() => {
        let i = this.contacts.findIndex((item) => item.id === id)
        this.contacts[i].name = newName
      })
    } catch (e) {
      console.log(e)
    }
  }

  createContact = async (name: string) => {
    const id = uuid()

    try {
      const res = await Server.createContact(id, name)
      runInAction(() => {
        this.contacts.push({ id, name })
      })
    } catch (e) {
      console.log(e)
    }
  }

  findContact = async (value: string) => {
    try {
      const res = await Server.findContact(value)
      runInAction(() => {
        this.contacts = res.data
      })
    } catch (e) {
      console.log(e)
    }
  }

  constructor() {
    makeObservable(this, {
      contacts: observable,
      getAll: action,
      removeContact: action,
      changeName: action,
      createContact: action,
      findContact: action,
    })
  }
}

export default new ContactsStore()
