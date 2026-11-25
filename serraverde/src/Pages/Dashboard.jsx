
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import '../Css/Dashboard.css'

const AVISOS = []

function Dashboard() {
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
    <div className="dashboard">

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

      <main className="dashboard-content">

        <header className="welcome-header">
          <h2>Quadro de avisos</h2>
          <p>Bem-vindo ao painel de gestão do pesqueiro.</p>
        </header>

        <section className="notice-board" aria-labelledby="avisos-titulo">

          <header className="notice-header">
            <div>
              <h3 id="avisos-titulo">Avisos importantes</h3>
              <p>Comunicados e informações internas</p>
            </div>

            <span className="notice-label">Comunicados</span>
          </header>

          {AVISOS.length === 0 ? (
            <div className="notice-empty">

              <div className="notice-icon" aria-hidden="true">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                  <path d="M10 21h4" />
                </svg>
              </div>

              <h4>Nenhum aviso no momento</h4>
              <p>Quando houver novos comunicados, eles aparecerão aqui.</p>

            </div>
          ) : (
            <ul className="notice-list">
              {AVISOS.map((aviso) => (
                <li key={aviso.id} className="notice-item">

                  <div>
                    <h4>{aviso.titulo}</h4>
                    <p>{aviso.texto}</p>
                  </div>

                  <time>{aviso.data}</time>

                </li>
              ))}
            </ul>
          )}

        </section>
      </main>
    </div>
  )
}

export default Dashboard
