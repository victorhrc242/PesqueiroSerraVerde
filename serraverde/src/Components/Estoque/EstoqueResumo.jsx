
function EstoqueResumo({ produtos }) {
  const total = produtos.length

  const baixo = produtos.filter(
    p => p.quantidade > 0 && p.quantidade <= p.minimo
  ).length

  const zerado = produtos.filter(
    p => p.quantidade === 0
  ).length

  const unidades = produtos.reduce(
    (total, p) => total + p.quantidade,
    0
  )

  const cards = [
    {
      titulo: 'Produtos cadastrados',
      valor: total,
      descricao: 'Produtos registrados',
      icone: '📦'
    },
    {
      titulo: 'Total de unidades',
      valor: unidades,
      descricao: 'Unidades disponíveis',
      icone: '🗃️'
    },
    {
      titulo: 'Estoque baixo',
      valor: baixo,
      descricao: 'Precisam de reposição',
      icone: '⚠️',
      alerta: true
    },
    {
      titulo: 'Sem estoque',
      valor: zerado,
      descricao: 'Produtos zerados',
      icone: '🚫',
      perigo: true
    }
  ]

  return (
    <section className="estoque-resumo">

      {cards.map((card, index) => (
        <article
          className={`resumo-card ${card.alerta ? 'card-alerta' : ''} ${card.perigo ? 'card-perigo' : ''}`}
          key={index}
        >
          <div className="resumo-card-topo">
            <span>{card.titulo}</span>
            <span className="resumo-icone">{card.icone}</span>
          </div>

          <strong>{card.valor}</strong>

          <small>{card.descricao}</small>
        </article>
      ))}

    </section>
  )
}

export default EstoqueResumo
