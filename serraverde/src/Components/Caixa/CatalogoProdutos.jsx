
import { useState } from 'react'

const produtos = [
  { id: 1, nome: 'Cerveja', categoria: 'Bebidas', preco: 8 },
  { id: 2, nome: 'Refrigerante', categoria: 'Bebidas', preco: 6 },
  { id: 3, nome: 'Água', categoria: 'Bebidas', preco: 4 },
  { id: 4, nome: 'Suco', categoria: 'Bebidas', preco: 7 },
  { id: 5, nome: 'Porção', categoria: 'Alimentos', preco: 35 },
  { id: 6, nome: 'Batata frita', categoria: 'Alimentos', preco: 25 },
]

const moeda = valor =>
  Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

function CatalogoProdutos({ comandaSelecionada, onAdicionarProduto }) {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todos')

  const produtosFiltrados = produtos.filter(produto => {
    const correspondeBusca = produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase())

    const correspondeCategoria =
      categoria === 'Todos' || produto.categoria === categoria

    return correspondeBusca && correspondeCategoria
  })

  return (
    <section className="painel-venda">

      <div className="painel-titulo">
        <div>
          <h2>Produtos</h2>
          <span>
            Selecione uma comanda e lance os produtos
          </span>
        </div>
      </div>

      <input
        className="busca-produto"
        placeholder="Buscar produto..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />

      <div className="categorias">
        {['Todos', 'Bebidas', 'Alimentos'].map(item => (
          <button
            key={item}
            className={
              categoria === item ? 'categoria-ativa' : ''
            }
            onClick={() => setCategoria(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="produtos-grid">

        {produtosFiltrados.map(produto => (
          <button
            key={produto.id}
            className="produto-card"
            disabled={!comandaSelecionada}
            onClick={() => onAdicionarProduto(produto)}
          >

            <span className="produto-icone">
              {produto.categoria === 'Bebidas' ? '🥤' : '🍟'}
            </span>

            <strong>{produto.nome}</strong>

            <span>{moeda(produto.preco)}</span>

            <small>+ Adicionar</small>

          </button>
        ))}

      </div>

      {!comandaSelecionada && (
        <p className="aviso-selecao">
          Selecione ou abra uma comanda para lançar produtos.
        </p>
      )}

      {produtosFiltrados.length === 0 && (
        <p className="aviso-selecao">
          Nenhum produto encontrado.
        </p>
      )}

    </section>
  )
}

export default CatalogoProdutos
