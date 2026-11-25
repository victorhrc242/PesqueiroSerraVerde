
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

function RotaProtegida() {
  const { sessao } = useAuth()
  const location = useLocation()

  if (!sessao) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <Outlet />
}

export default RotaProtegida
