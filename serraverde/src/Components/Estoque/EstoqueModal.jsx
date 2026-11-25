
import { useState } from 'react'

function EstoqueModal({ produto, onSalvar, onFechar }) {
  const [nome, setNome] = useState(produto?.nome || '')
  const [categoria, setCategoria] = useState(produto?.categoria || 'Bebidas')
  const [quantidade, setQuantidade] = useState(produto?.quantidade ?? 0)
  const [minimo, setMinimo] = useState(produto?.minimo ?? 5)
  const [custo, setCusto] = useState(produto?.custo ?? '')

  function handleSubmit(e) {
    e.preventDefault()

    if (!nome.trim()) {
      alert('Informe o nome do produto.')
      return
    }

    const qtd = Number(quantidade)
    const qtdMinima = Number(minimo)
    const preco = Number(custo || 0)

    if (
      !Number.isInteger(qtd) ||
      !Number.isInteger(qtdMinima) ||
      qtd < 0 ||
      qtdMinima < 0 ||
      !Number.isFinite(preco) ||
      preco < 0
    ) {
      alert('Confira os valores informados.')
      return
    }

    onSalvar({
      nome: nome.trim(),
      categoria,
      quantidade: qtd,
      minimo: qtdMinima,
      custo: preco
    })
  }

  return (
    <div className="estoque-overlay" onClick={onFechar}>

      <div
        className="estoque-modal"
        onClick={e => e.stopPropagation()}
      >

        <div className="modal-header">
          <div>
            <h2>{produto ? 'Editar produto' : 'Novo produto'}</h2>
            <p>Preencha as informações do produto.</p>
          </div>

          <button className="modal-fechar" onClick={onFechar}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="campo-modal">
            <label>Nome do produto</label>
            <input
              type="text"
              placeholder="Ex: Coca-Cola 2L"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </div>

          <div className="campo-modal">
            <label>Categoria</label>
            <select
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option value="Bebidas">Bebidas</option>
              <option value="Porções">Porções</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="modal-grid">

            <div className="campo-modal">
              <label>Quantidade inicial</label>
              <input
                type="number"
                min="0"
                step="1"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
                required
              />
            </div>

            <div className="campo-modal">
              <label>Estoque mínimo</label>
              <input
                type="number"
                min="0"
                step="1"
                value={minimo}
                onChange={e => setMinimo(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="campo-modal">
            <label>Preço de custo (R$)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={custo}
              onChange={e => setCusto(e.target.value)}
            />
          </div>

          <div className="modal-acoes">
            <button
              type="button"
              className="btn-cancelar"
              onClick={onFechar}
            >
              Cancelar
            </button>

            <button type="submit" className="btn-salvar">
              {produto ? 'Salvar alterações' : 'Cadastrar produto'}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default EstoqueModal
