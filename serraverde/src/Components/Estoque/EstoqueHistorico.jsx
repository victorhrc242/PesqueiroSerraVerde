
function EstoqueHistorico({ historico }) {
  function obterClasse(tipo) {
    if (tipo === 'Entrada') return 'historico-entrada'
    if (tipo === 'Saída') return 'historico-saida'
    return 'historico-outro'
  }

  return (
    <section className="estoque-section historico-section">

      <div className="estoque-section-header">
        <div>
          <h2>Histórico de movimentações</h2>
          <p>Acompanhe as alterações realizadas no estoque.</p>
        </div>
      </div>

      <div className="estoque-tabela-container">

        <table className="estoque-tabela">

          <thead>
            <tr>
              <th>Data</th>
              <th>Produto</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Motivo</th>
            </tr>
          </thead>

          <tbody>

            {historico.length === 0 ? (
              <tr>
                <td colSpan="5" className="tabela-vazia">
                  Nenhuma movimentação registrada.
                </td>
              </tr>
            ) : (

              historico.map(item => (
                <tr key={item.id}>

                  <td>{item.data}</td>

                  <td>
                    <strong>{item.produto}</strong>
                  </td>

                  <td>
                    <span className={`historico-tipo ${obterClasse(item.tipo)}`}>
                      {item.tipo}
                    </span>
                  </td>

                  <td>{item.quantidade} un.</td>

                  <td>{item.motivo}</td>

                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

    </section>
  )
}

export default EstoqueHistorico
