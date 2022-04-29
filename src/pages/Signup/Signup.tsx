import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import './style.scss'
import Auth from '../../store/auth'
import { observer } from 'mobx-react-lite'

interface User {
  name: string
  email: string
  password: string
}

function Signup() {
  let [err, setErr] = useState<string>('')

  const location = useLocation()
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

    if (name && email && password !== '') {
      e.preventDefault()
      const response = await Auth.register({ name, email, password })
      if (response?.status === 201) {
        navigate('/')
      }
    } else {
      setErr('заполните все поля')
    }
  }

  return (
    <div className="register">
      <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
        <span className="register-form__title">SignUp</span>
        <input
          name="name"
          type="text"
          className="register-form__name"
          placeholder="UserName"
        />
        <input
          name="email"
          type="email"
          className="register-form__login"
          placeholder="Login"
        />
        <input
          name="password"
          type="password"
          className="register-form__password"
          placeholder="Password"
        />
        <span className="register-form__account-have">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </span>
        <span>{err}</span>
        <span>{Auth.authError}</span>
        <button className="register-form__btn">SignUp</button>
      </form>
    </div>
  )
}

export default observer(Signup)
