
import { Link, useLocation } from 'react-router-dom'

function EstoqueNavbar() {
  const location = useLocation()

  return (
    <nav className="estoque-navbar">
      <div className="estoque-navbar-content">

        <Link to="/dashboard" className="estoque-logo">
          <span className="estoque-logo-icon">SV</span>
          <span>
            Serra Verde
            <small>PESQUEIRO</small>
          </span>
        </Link>

        <div className="estoque-nav-links">
          <Link
            to="/dashboard"
            className={location.pathname === '/dashboard' ? 'ativo' : ''}
          >
            Dashboard
          </Link>

          <Link
            to="/caixa"
            className={location.pathname === '/caixa' ? 'ativo' : ''}
          >
            Caixa
          </Link>

          <Link
            to="/estoque"
            className={location.pathname === '/estoque' ? 'ativo' : ''}
          >
            Estoque
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default EstoqueNavbar
