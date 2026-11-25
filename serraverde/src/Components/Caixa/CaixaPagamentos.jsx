
const moeda = valor =>
  Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function CaixaPagamentos({ vendas }) {
  const totalDinheiro = vendas
    .filter(venda => venda.pagamento === 'Dinheiro')
    .reduce((total, venda) => total + venda.total, 0)

  const totalPix = vendas
    .filter(venda => venda.pagamento === 'Pix')
    .reduce((total, venda) => total + venda.total, 0)

  const totalCartao = vendas
    .filter(venda =>
      ['Crédito', 'Débito'].includes(venda.pagamento)
    )
    .reduce((total, venda) => total + venda.total, 0)

  return (
    <section className="caixa-pagamentos">

      <div>
        <span>Dinheiro</span>
        <strong>{moeda(totalDinheiro)}</strong>
      </div>

      <div>
        <span>Pix</span>
        <strong>{moeda(totalPix)}</strong>
      </div>

      <div>
        <span>Cartões</span>
        <strong>{moeda(totalCartao)}</strong>
      </div>

    </section>
  )
}

export default CaixaPagamentos
