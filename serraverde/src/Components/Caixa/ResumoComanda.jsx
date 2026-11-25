
const moeda = valor =>
  Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function ResumoComanda({
  comanda,
  onAlterarQuantidade,
  onFinalizar,
  onCancelar,
}) {
  const total = comanda
    ? comanda.itens.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
      )
    : 0

  return (
    <aside className="painel-resumo">

      <div className="painel-titulo">
        <div>
          <h2>Comanda atual</h2>
          <span>{comanda?.nome || 'Nenhuma selecionada'}</span>
        </div>
      </div>

      {!comanda ? (

        <div className="estado-vazio">
          <span>🧾</span>
          <p>Nenhuma comanda selecionada.</p>
        </div>

      ) : (

        <>
          <div className="itens-comanda">

            {comanda.itens.length === 0 ? (

              <div className="estado-vazio">
                <p>Comanda sem produtos.</p>
                <small>Adicione produtos pelo catálogo.</small>
              </div>

            ) : (

              comanda.itens.map(item => (
                <div className="item-venda" key={item.id}>

                  <div>
                    <strong>{item.nome}</strong>
                    <small>{moeda(item.preco)} cada</small>
                  </div>

                  <div className="quantidade-controle">
                    <button
                      onClick={() => onAlterarQuantidade(item.id, -1)}
                    >
                      −
                    </button>

                    <span>{item.quantidade}</span>

                    <button
                      onClick={() => onAlterarQuantidade(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    {moeda(item.preco * item.quantidade)}
                  </strong>

                </div>
              ))

            )}

          </div>

          <div className="total-comanda">
            <span>Total da comanda</span>
            <strong>{moeda(total)}</strong>
          </div>

          <button
            className="botao-finalizar"
            disabled={total <= 0}
            onClick={onFinalizar}
          >
            Finalizar e receber
          </button>

          <button
            className="botao-cancelar"
            onClick={onCancelar}
          >
            Cancelar comanda
          </button>
        </>

      )}

    </aside>
  )
}

export default ResumoComanda
