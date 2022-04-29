import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import type { FormEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Auth from '../../store/auth'
import './style.scss'

function Login() {
  let [err, setErr] = useState<string>('')

  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string }
      email: { value: string }
      password: { value: string }
    }
    const name = target.name.value
    const email = target.email.value
    const password = target.password.value

    if (email && password !== '') {
      const response = await Auth.login({ name, email, password })
      if (response?.status === 200) {
        navigate('/')
      }
    } else {
      setErr('заполните все поля')
    }
  }

  return (
    <div className="login">
      <form onSubmit={(e) => handleSubmit(e)} className="login-form">
        <span className="login-form__title">Login</span>
        <input
          name="email"
          type="email"
          className="login-form__login"
          placeholder="Login"
        />
        <input
          name="password"
          type="password"
          className="login-form__password"
          placeholder="Password"
        />
        <span className="login-form__account-have">
          Don’t have an account? Sign Up{' '}
          <NavLink to="/register">Sign Up</NavLink>
        </span>
        <span>{err}</span>
        <span>{Auth.authError}</span>
        <button className="login-form__btn">Login</button>
      </form>
    </div>
  )
}

export default observer(Login)
