import { server } from './server'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

async function register(data: Object): Promise<AxiosResponse> {
  return await server.post<AuthResponse>('/register', data)
}

async function login(data: Object): Promise<AxiosResponse> {
  return await server.post<AuthResponse>('/login', data)
}

export { register, login }
