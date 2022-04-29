import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Auth from './store/auth'
import { observer } from 'mobx-react-lite'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Error from './pages/ErrorPage/index'
import ProtoctedRoutes from './hooks/ProtoctedRoutes'
function App() {
  const navigate = useNavigate()

  const location = useLocation()

  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route element={<ProtoctedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default observer(App)
