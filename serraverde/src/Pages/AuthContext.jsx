
import { createContext, useContext, useMemo, useState } from 'react'

const CHAVE_SESSAO = 'pesqueiro:sessao'

async function autenticar(usuario, senha) {
  const usuarioOk = import.meta.env.VITE_USUARIO ?? 'SerraVerde2026'
  const senhaOk = import.meta.env.VITE_SENHA ?? 'FamiliaCosta2026'

  if (usuario === usuarioOk && senha === senhaOk) {
    return {
      nome: 'Administrador',
      empresa: 'Pesqueiro Serra Verde'
    }
  }

  return null
}

function lerSessao() {
  try {
    return JSON.parse(sessionStorage.getItem(CHAVE_SESSAO))
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [sessao, setSessao] = useState(lerSessao)

  const valor = useMemo(() => ({
    sessao,

    async entrar(usuario, senha) {
      const dados = await autenticar(usuario.trim(), senha)

      if (!dados) return false

      sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(dados))
      setSessao(dados)

      return true
    },

    sair() {
      sessionStorage.removeItem(CHAVE_SESSAO)
      setSessao(null)
    }
  }), [sessao])

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const contexto = useContext(AuthContext)

  if (!contexto) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return contexto
}
