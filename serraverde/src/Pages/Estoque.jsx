
import { useMemo, useState } from 'react'

import EstoqueResumo from '../Components/Estoque/EstoqueResumo'
import EstoqueFiltros from '../Components/Estoque/EstoqueFiltros'
import EstoqueTabela from '../Components/Estoque/EstoqueTabela'
import EstoqueModal from '../Components/Estoque/EstoqueModal'
import EstoqueMovimentacao from '../Components/Estoque/EstoqueMovimentacao'
import EstoqueHistorico from '../Components/Estoque/EstoqueHistorico'
import Navbar from '../Components/Caixa/Navbar'
import '../Css/Estoque.css'

const produtosIniciais = [
  { id: 1, nome: 'Coca-Cola 2L', categoria: 'Bebidas', quantidade: 30, minimo: 10, custo: 8.50 },
  { id: 2, nome: 'Cerveja Lata', categoria: 'Bebidas', quantidade: 5, minimo: 10, custo: 3.50 },
  { id: 3, nome: 'Água Mineral', categoria: 'Bebidas', quantidade: 0, minimo: 10, custo: 1.50 },
  { id: 4, nome: 'Porção de Batata', categoria: 'Porções', quantidade: 12, minimo: 5, custo: 12.00 },
  { id: 5, nome: 'Suco Natural', categoria: 'Bebidas', quantidade: 18, minimo: 5, custo: 4.00 },
]

function Estoque() {
  const [produtos, setProdutos] = useState(produtosIniciais)
  const [historico, setHistorico] = useState([])

  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [status, setStatus] = useState('Todos')

  const [modalAberto, setModalAberto] = useState(false)
  const [produtoEditando, setProdutoEditando] = useState(null)

  const [movimentacaoAberta, setMovimentacaoAberta] = useState(false)
  const [produtoMovimentado, setProdutoMovimentado] = useState(null)

  const produtosFiltrados = useMemo(() => {
    return produtos.filter(produto => {
      const correspondeBusca = produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase())

      const correspondeCategoria =
        categoria === 'Todas' || produto.categoria === categoria

      const situacao =
        produto.quantidade === 0
          ? 'Zerado'
          : produto.quantidade <= produto.minimo
            ? 'Baixo'
            : 'Normal'

      const correspondeStatus =
        status === 'Todos' || situacao === status

      return correspondeBusca && correspondeCategoria && correspondeStatus
    })
  }, [produtos, busca, categoria, status])

  function registrarHistorico(produto, tipo, quantidade, motivo) {
    const registro = {
      id: Date.now(),
      produto: produto.nome,
      tipo,
      quantidade,
      motivo,
      data: new Date().toLocaleString('pt-BR')
    }

    setHistorico(prev => [registro, ...prev])
  }

  function salvarProduto(dados) {
    if (produtoEditando) {
      setProdutos(prev =>
        prev.map(produto =>
          produto.id === produtoEditando.id
            ? { ...produto, ...dados }
            : produto
        )
      )

      registrarHistorico(
        { ...produtoEditando, ...dados },
        'Edição',
        0,
        'Dados do produto atualizados'
      )
    } else {
      const novoProduto = {
        ...dados,
        id: Date.now()
      }

      setProdutos(prev => [...prev, novoProduto])

      if (novoProduto.quantidade > 0) {
        registrarHistorico(
          novoProduto,
          'Entrada',
          novoProduto.quantidade,
          'Cadastro inicial do produto'
        )
      }
    }

    setModalAberto(false)
    setProdutoEditando(null)
  }

  function excluirProduto(id) {
    const produto = produtos.find(item => item.id === id)

    if (!produto) return

    const confirmar = window.confirm(
      `Deseja realmente excluir ${produto.nome}?`
    )

    if (!confirmar) return

    setProdutos(prev => prev.filter(item => item.id !== id))

    registrarHistorico(
      produto,
      'Exclusão',
      0,
      'Produto excluído do estoque'
    )
  }

  function abrirEdicao(produto) {
    setProdutoEditando(produto)
    setModalAberto(true)
  }

  function abrirNovoProduto() {
    setProdutoEditando(null)
    setModalAberto(true)
  }

  function abrirMovimentacao(produto) {
    setProdutoMovimentado(produto)
    setMovimentacaoAberta(true)
  }

  function salvarMovimentacao(dados) {
    const produto = produtos.find(
      item => item.id === produtoMovimentado.id
    )

    if (!produto) return

    const quantidade = Number(dados.quantidade)

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      alert('Informe uma quantidade inteira válida.')
      return
    }

    if (dados.tipo === 'Saída' && quantidade > produto.quantidade) {
      alert('Não existe quantidade suficiente no estoque.')
      return
    }

    setProdutos(prev =>
      prev.map(item => {
        if (item.id !== produto.id) return item

        return {
          ...item,
          quantidade:
            dados.tipo === 'Entrada'
              ? item.quantidade + quantidade
              : item.quantidade - quantidade
        }
      })
    )

    registrarHistorico(
      produto,
      dados.tipo,
      quantidade,
      dados.motivo
    )

    setMovimentacaoAberta(false)
    setProdutoMovimentado(null)
  }

  return (
    <div>

   
    <Navbar/>
    <div className="estoque-page">



      <main className="estoque-container">

        <header className="estoque-header">
          <div>
            <span className="estoque-subtitulo">GESTÃO DO PESQUEIRO</span>
            <h1>Estoque</h1>
            <p>Controle seus produtos, entradas e saídas.</p>
          </div>

          <button
            className="btn-novo-produto"
            onClick={abrirNovoProduto}
          >
            + Novo produto
          </button>
        </header>

        <EstoqueResumo produtos={produtos} />

        <section className="estoque-section">

          <div className="estoque-section-header">
            <div>
              <h2>Produtos cadastrados</h2>
              <p>Gerencie os produtos disponíveis no estabelecimento.</p>
            </div>
          </div>

          <EstoqueFiltros
            busca={busca}
            setBusca={setBusca}
            categoria={categoria}
            setCategoria={setCategoria}
            status={status}
            setStatus={setStatus}
          />

          <EstoqueTabela
            produtos={produtosFiltrados}
            onEditar={abrirEdicao}
            onExcluir={excluirProduto}
            onMovimentar={abrirMovimentacao}
          />

        </section>

        <EstoqueHistorico historico={historico} />

      </main>

      {modalAberto && (
        <EstoqueModal
          produto={produtoEditando}
          onSalvar={salvarProduto}
          onFechar={() => {
            setModalAberto(false)
            setProdutoEditando(null)
          }}
        />
      )}

      {movimentacaoAberta && produtoMovimentado && (
        <EstoqueMovimentacao
          produto={produtoMovimentado}
          onSalvar={salvarMovimentacao}
          onFechar={() => {
            setMovimentacaoAberta(false)
            setProdutoMovimentado(null)
          }}
        />
      )}

    </div>
     </div>
  )
}

export default Estoque
