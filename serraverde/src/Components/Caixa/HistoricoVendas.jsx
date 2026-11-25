
const moeda = valor =>
  Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function HistoricoVendas({ vendas }) {
  return (
    <section className="caixa-historico">

      <div className="painel-titulo">
        <div>
          <h2>Últimas vendas</h2>
          <span>Comandas já finalizadas</span>
        </div>
      </div>

      {vendas.length === 0 ? (

        <p className="historico-vazio">
          Nenhuma venda finalizada nesta sessão.
        </p>

      ) : (

        <div className="historico-lista">

          {vendas.map(venda => (
            <div className="historico-item" key={venda.id}>

              <div>
                <strong>{venda.nome}</strong>
                <small>{venda.data}</small>
              </div>

              <span>{venda.pagamento}</span>

              <strong>{moeda(venda.total)}</strong>

            </div>
          ))}

        </div>

      )}

    </section>
  )
}

export default HistoricoVendas
