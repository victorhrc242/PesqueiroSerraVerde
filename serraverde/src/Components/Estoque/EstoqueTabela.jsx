
function EstoqueTabela({
  produtos,
  onEditar,
  onExcluir,
  onMovimentar
}) {
  function obterStatus(produto) {
    if (produto.quantidade === 0) {
      return { texto: 'Sem estoque', classe: 'zerado' }
    }

    if (produto.quantidade <= produto.minimo) {
      return { texto: 'Estoque baixo', classe: 'baixo' }
    }

    return { texto: 'Normal', classe: 'normal' }
  }

  return (
    <div className="estoque-tabela-container">

      <table className="estoque-tabela">

        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Estoque mínimo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {produtos.length === 0 ? (
            <tr>
              <td colSpan="6" className="tabela-vazia">
                Nenhum produto encontrado.
              </td>
            </tr>
          ) : (

            produtos.map(produto => {
              const situacao = obterStatus(produto)

              return (
                <tr key={produto.id}>

                  <td>
                    <strong>{produto.nome}</strong>
                  </td>

                  <td>{produto.categoria}</td>

                  <td>
                    <strong>{produto.quantidade}</strong>
                    <span className="unidade-texto"> un.</span>
                  </td>

                  <td>{produto.minimo} un.</td>

                  <td>
                    <span className={`estoque-status ${situacao.classe}`}>
                      {situacao.texto}
                    </span>
                  </td>

                  <td>
                    <div className="acoes-produto">

                      <button
                        title="Movimentar estoque"
                        onClick={() => onMovimentar(produto)}
                      >
                        ⇅
                      </button>

                      <button
                        title="Editar produto"
                        onClick={() => onEditar(produto)}
                      >
                        ✎
                      </button>

                      <button
                        title="Excluir produto"
                        className="acao-excluir"
                        onClick={() => onExcluir(produto.id)}
                      >
                        ×
                      </button>

                    </div>
                  </td>

                </tr>
              )
            })
          )}

        </tbody>

      </table>

    </div>
  )
}

export default EstoqueTabela
