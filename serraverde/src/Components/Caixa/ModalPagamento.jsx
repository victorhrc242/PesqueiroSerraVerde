
import { useState } from 'react'

const moeda = valor =>
  Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function ModalPagamento({
  total,
  onConfirmar,
  onFechar,
}) {
  const [formaPagamento, setFormaPagamento] = useState('Dinheiro')
  const [valorRecebido, setValorRecebido] = useState('')

  const recebido = Number(valorRecebido.replace(',', '.'))

  const troco = Math.max(0, recebido - total)

  function confirmar() {
    if (formaPagamento === 'Dinheiro' && recebido < total) {
      alert('O valor recebido é menor que o total da comanda.')
      return
    }

    onConfirmar({
      formaPagamento,
      valorRecebido: formaPagamento === 'Dinheiro' ? recebido : total,
      troco: formaPagamento === 'Dinheiro' ? troco : 0,
    })
  }

  return (
    <div className="modal-fundo">

      <div className="modal-pagamento">

        <button
          className="modal-fechar"
          onClick={onFechar}
        >
          ×
        </button>

        <h2>Finalizar comanda</h2>

        <p>
          Confira o valor e informe como o cliente irá pagar.
        </p>

        <div className="modal-total">
          <span>Total a receber</span>
          <strong>{moeda(total)}</strong>
        </div>

        <label>Forma de pagamento</label>

        <div className="formas-pagamento">
          {['Dinheiro', 'Pix', 'Crédito', 'Débito'].map(forma => (
            <button
              key={forma}
              className={
                formaPagamento === forma ? 'forma-ativa' : ''
              }
              onClick={() => setFormaPagamento(forma)}
            >
              {forma}
            </button>
          ))}
        </div>

        {formaPagamento === 'Dinheiro' && (
          <>
            <label>Valor recebido</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={valorRecebido}
              onChange={e => setValorRecebido(e.target.value)}
              placeholder="Ex.: 100,00"
            />

            <div className="troco">
              <span>Troco</span>
              <strong>{moeda(troco)}</strong>
            </div>
          </>
        )}

        <button
          className="botao-finalizar"
          onClick={confirmar}
        >
          Confirmar pagamento
        </button>

      </div>

    </div>
  )
}

export default ModalPagamento
