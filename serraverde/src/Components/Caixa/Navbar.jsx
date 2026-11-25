
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Pages/AuthContext.jsx'

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false)

  const menuRef = useRef(null)
  const botaoRef = useRef(null)

  const navigate = useNavigate()
  const { sessao, sair } = useAuth()

  useEffect(() => {
    if (!menuAberto) return

    function aoClicar(e) {
      if (!menuRef.current?.contains(e.target)) {
        setMenuAberto(false)
      }
    }

    function aoTeclar(e) {
      if (e.key === 'Escape') {
        setMenuAberto(false)
        botaoRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', aoClicar)
    document.addEventListener('keydown', aoTeclar)

    return () => {
      document.removeEventListener('mousedown', aoClicar)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [menuAberto])

  function handleSair() {
    setMenuAberto(false)
    sair()
    navigate('/', { replace: true })
  }

  return (
    <nav className="navbar" aria-label="Navegação principal">

      <Link to="/dashboard" className="navbar-brand">
        <div className="brand-logo" aria-hidden="true">PS</div>

        <span className="navbar-nome">
          Pesqueiro<span>System</span>
        </span>
      </Link>

      <div className="navbar-links">
        <NavLink to="/caixa">Caixa</NavLink>
        <NavLink to="/estoque">Estoque</NavLink>
      </div>

      <div className="navbar-user" ref={menuRef}>

        <button
          ref={botaoRef}
          type="button"
          className="user-avatar"
          aria-label="Menu do usuário"
          aria-haspopup="true"
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(v => !v)}
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </button>

        {menuAberto && (
          <div className="user-menu">

            <div className="user-menu-info">
              <strong>{sessao?.nome}</strong>
              <span>{sessao?.empresa}</span>
            </div>

            <div className="user-menu-divider" />

            <button
              type="button"
              className="logout-button"
              onClick={handleSair}
            >
              Sair do sistema
            </button>

          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar
