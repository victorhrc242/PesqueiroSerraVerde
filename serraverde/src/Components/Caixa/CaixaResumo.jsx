
const moeda = valor =>
  Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function CaixaResumo({ comandas, vendas, cancelamentos }) {
  const comandasAbertas = comandas.filter(
    comanda => comanda.status === 'aberta'
  )

  return (
    <section className="caixa-resumo">

      <article className="resumo-card">
        <span>Vendas registradas</span>
        <strong>
          {moeda(vendas.reduce((total, venda) => total + venda.total, 0))}
        </strong>
        <small>Vendas finalizadas nesta sessão</small>
      </article>

      <article className="resumo-card">
        <span>Comandas abertas</span>
        <strong>{comandasAbertas.length}</strong>
        <small>Clientes em atendimento</small>
      </article>

      <article className="resumo-card">
        <span>Vendas concluídas</span>
        <strong>{vendas.length}</strong>
        <small>Comandas finalizadas</small>
      </article>

      <article className="resumo-card">
        <span>Cancelamentos</span>
        <strong>{cancelamentos.length}</strong>
        <small>Registros de cancelamento</small>
      </article>

    </section>
  )
}

export default CaixaResumo
