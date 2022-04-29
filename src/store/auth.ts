import { makeObservable, observable, action, computed, runInAction } from 'mobx'
import * as AuthService from '../services/AuthService'
import { AxiosError } from 'axios'
import { IUser } from '../models/IUser'

class Auth {
  user = {} as IUser
  token = localStorage.getItem('auth__token')
  authError: string = ''
  isAuth = false

  checkAuth = () => {
    try {
      let token = localStorage.getItem('auth__token')
      if (token !== null) {
        this.isAuth = true
      }
    } catch (e) {
      console.log(e)
    }
  }

  register = async (data: Object) => {
    try {
      const response = await AuthService.register(data)
      localStorage.setItem('auth__token', response.data.accessToken)
      runInAction(() => {
        this.isAuth = true
        this.user = response.data.user
      })
      return response
    } catch (e: any) {
      console.log(e.response?.data)
      this.authError = e.response.data
    }
  }

  login = async (data: Object) => {
    try {
      const response = await AuthService.login(data)
      localStorage.setItem('auth__token', response.data.accessToken)
      runInAction(() => {
        this.isAuth = true
        this.user = response.data.user
      })
      return response
    } catch (e: any) {
      console.log(e.response.data)
      this.authError = e.response.data
    }
  }

  logout = () => {
    this.user = {} as IUser
    localStorage.removeItem('auth__token')
  }

  constructor() {
    makeObservable(this, {
      user: observable,
      authError: observable,
      isAuth: observable,
      register: action,
      login: action,
      logout: action,
      token: observable,
      checkAuth: action,
    })
  }
}

export default new Auth()
