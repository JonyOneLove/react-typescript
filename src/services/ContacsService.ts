import { server } from './server'
import { AxiosResponse } from 'axios'
import { IContact } from '../models/response/ContactResponse'

async function getContacts(): Promise<AxiosResponse> {
  return await server.get<IContact[]>('/contacts')
}

async function removeContact(id: string): Promise<AxiosResponse> {
  return await server.delete('/contacts/' + id)
}

async function changeName(id: string, newName: string): Promise<AxiosResponse> {
  return await server.patch('/contacts/' + id, { name: newName })
}

async function createContact(id: string, name: string): Promise<AxiosResponse> {
  return await server.post('/contacts', { id, name })
}

async function findContact(value: string): Promise<AxiosResponse> {
  return await server.get(`/contacts?q=${value}`)
}

export { getContacts, removeContact, changeName, createContact, findContact }
