
import { Link } from 'react-router-dom'
import '../Css/Modulo.css'

function ModuloEmDesenvolvimento({ nome }) {
  return (
    <main className="modulo">
      <section className="modulo-conteudo">
        <h1>{nome}</h1>

        <p>Este módulo está em desenvolvimento.</p>

        <Link to="/dashboard" className="modulo-voltar">
          Voltar ao painel
        </Link>
      </section>
    </main>
  )
}

export default ModuloEmDesenvolvimento
