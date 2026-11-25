
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './Pages/AuthContext.jsx'
import './Css/Login.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const { sessao, entrar } = useAuth()

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const destino = location.state?.from ?? '/dashboard'

  if (sessao) {
    return <Navigate to={destino} replace />
  }

  async function handleLogin(e) {
    e.preventDefault()

    if (carregando) return

    setErro('')
    setCarregando(true)

    try {
      const ok = await entrar(usuario, senha)

      if (ok) {
        navigate(destino, { replace: true })
        return
      }

      setErro('Usuário ou senha incorretos. Confira os dados e tente de novo.')
      setSenha('')
    } catch {
      setErro('Não foi possível entrar agora. Tente novamente em instantes.')
    } finally {
      setCarregando(false)
    }
  }

  function limparErro() {
    if (erro) setErro('')
  }

  return (
    <main className="login-container">
      <section className="login-card">

        <header className="login-brand">
          <div className="brand-logo brand-logo--grande" aria-hidden="true">
            PS
          </div>

          <h1>
            Pesqueiro<span>System</span>
          </h1>

          <p>Sistema de gestão e controle</p>
        </header>

        <div className="login-header">
          <h2>Acessar plataforma</h2>
          <p>Informe suas credenciais para continuar.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin} noValidate>

          <div className="input-group">
            <label htmlFor="usuario">Usuário</label>

            <input
              id="usuario"
              type="text"
              placeholder="Informe seu usuário"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value)
                limparErro()
              }}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              aria-invalid={Boolean(erro)}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>

            <div className="input-senha">
              <input
                id="senha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Informe sua senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value)
                  limparErro()
                }}
                autoComplete="current-password"
                aria-invalid={Boolean(erro)}
                required
              />

              <button
                type="button"
                className="toggle-senha"
                onClick={() => setMostrarSenha(v => !v)}
                aria-pressed={mostrarSenha}
              >
                {mostrarSenha ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          {erro && (
            <p id="login-erro" className="login-error" role="alert">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={carregando || !usuario.trim() || !senha}
          >
            {carregando ? 'Entrando…' : 'Entrar'}
          </button>

        </form>

        <footer className="login-footer">
          <p>PesqueiroSystem © {new Date().getFullYear()}</p>
          <span>Todos os direitos reservados.</span>
        </footer>

      </section>
    </main>
  )
}

export default Login
