
import { useState } from 'react'

function EstoqueMovimentacao({ produto, onSalvar, onFechar }) {
  const [tipo, setTipo] = useState('Entrada')
  const [quantidade, setQuantidade] = useState(1)
  const [motivo, setMotivo] = useState('Reposição de estoque')

  function handleSubmit(e) {
    e.preventDefault()

    onSalvar({
      tipo,
      quantidade,
      motivo: motivo.trim()
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
            <h2>Movimentar estoque</h2>
            <p>{produto.nome}</p>
          </div>

          <button className="modal-fechar" onClick={onFechar}>
            ×
          </button>
        </div>

        <div className="produto-atual">
          <span>Quantidade atual</span>
          <strong>{produto.quantidade} unidades</strong>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="campo-modal">
            <label>Tipo de movimentação</label>

            <select
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            >
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>
          </div>

          <div className="campo-modal">
            <label>Quantidade</label>

            <input
              type="number"
              min="1"
              step="1"
              value={quantidade}
              onChange={e => setQuantidade(e.target.value)}
              required
            />
          </div>

          <div className="campo-modal">
            <label>Motivo</label>

            <select
              value={motivo}
              onChange={e => setMotivo(e.target.value)}
            >
              {tipo === 'Entrada' ? (
                <>
                  <option>Reposição de estoque</option>
                  <option>Compra de produtos</option>
                  <option>Devolução</option>
                  <option>Outro</option>
                </>
              ) : (
                <>
                  <option>Consumo interno</option>
                  <option>Perda ou avaria</option>
                  <option>Uso operacional</option>
                  <option>Outro</option>
                </>
              )}
            </select>
          </div>

          <div className="modal-acoes">
            <button
              type="button"
              className="btn-cancelar"
              onClick={onFechar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-salvar"
            >
              Confirmar movimentação
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default EstoqueMovimentacao
