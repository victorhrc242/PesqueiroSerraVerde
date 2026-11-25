
const moeda = valor =>
  Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function ListaComandas({
  comandas,
  selecionada,
  onSelecionar,
  nomeCliente,
  setNomeCliente,
  onAbrirComanda,
}) {
  const comandasAbertas = comandas.filter(
    comanda => comanda.status === 'aberta'
  )

  return (
    <aside className="painel-comandas">

      <div className="painel-titulo">
        <div>
          <h2>Comandas</h2>
          <span>{comandasAbertas.length} em aberto</span>
        </div>
      </div>

      <div className="nova-comanda">

        <input
          value={nomeCliente}
          onChange={e => setNomeCliente(e.target.value)}
          placeholder="Nome do cliente ou grupo"
          onKeyDown={e => {
            if (e.key === 'Enter') onAbrirComanda()
          }}
        />

        <button onClick={onAbrirComanda}>
          + Nova comanda
        </button>

      </div>

      <div className="lista-comandas">

        {comandasAbertas.length === 0 ? (

          <div className="estado-vazio">
            <span>📋</span>
            <p>Nenhuma comanda aberta.</p>
            <small>
              Abra uma comanda para iniciar um atendimento.
            </small>
          </div>

        ) : (

          comandasAbertas.map(comanda => {

            const total = comanda.itens.reduce(
              (soma, item) =>
                soma + item.preco * item.quantidade,
              0
            )

            return (
              <button
                key={comanda.id}
                className={`comanda-item ${
                  selecionada === comanda.id ? 'ativa' : ''
                }`}
                onClick={() => onSelecionar(comanda.id)}
              >

                <span className="comanda-icon">#</span>

                <span className="comanda-info">
                  <strong>{comanda.nome}</strong>
                  <small>
                    Aberta às {comanda.criadaEm}
                  </small>
                </span>

                <strong>{moeda(total)}</strong>

              </button>
            )
          })

        )}

      </div>

    </aside>
  )
}

export default ListaComandas
