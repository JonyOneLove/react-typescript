import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router'
import Auth from '../store/auth'
import { Navigate, Outlet } from 'react-router-dom'

const ProtoctedRoutes: FC = () => {
  if (!Auth.isAuth) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default observer(ProtoctedRoutes)
