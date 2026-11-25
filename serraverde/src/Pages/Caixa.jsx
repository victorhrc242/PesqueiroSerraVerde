
import { useState } from 'react'

import CaixaHeader from '../Components/Caixa/CaixaHeader.jsx'
import CaixaResumo from '../Components/Caixa/CaixaResumo.jsx'
import CaixaPagamentos from '../Components/Caixa/CaixaPagamentos.jsx'
import ListaComandas from '../Components/Caixa/ListaComandas.jsx'
import CatalogoProdutos from '../Components/Caixa/CatalogoProdutos.jsx'
import ResumoComanda from '../Components/Caixa/ResumoComanda.jsx'
import ModalPagamento from '../Components/Caixa/ModalPagamento.jsx'
import HistoricoVendas from '../Components/Caixa/HistoricoVendas.jsx'
import Navbar from '../Components/Caixa/Navbar.jsx'
import '../Css/Caixa.css'

function Caixa() {
  // Dados do caixa
  const [comandas, setComandas] = useState([])
  const [vendas, setVendas] = useState([])
  const [cancelamentos, setCancelamentos] = useState([])

  // Comanda selecionada
  const [comandaSelecionada, setComandaSelecionada] = useState(null)

  // Cadastro de comanda
  const [nomeCliente, setNomeCliente] = useState('')

  // Modal de pagamento
  const [modalPagamento, setModalPagamento] = useState(false)

  // Localiza a comanda selecionada
  const selecionada = comandas.find(
    comanda => comanda.id === comandaSelecionada
  )

  // Abre uma nova comanda
  function abrirComanda() {
    const novaComanda = {
      id: Date.now(),
      nome: nomeCliente.trim() || `Comanda ${comandas.length + 1}`,
      itens: [],
      status: 'aberta',

      criadaEm: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setComandas(atual => [...atual, novaComanda])

    setComandaSelecionada(novaComanda.id)

    setNomeCliente('')
  }

  // Adiciona produto à comanda
  function adicionarProduto(produto) {
    if (!selecionada) return

    setComandas(atual =>
      atual.map(comanda => {
        if (comanda.id !== selecionada.id) {
          return comanda
        }

        const itemExistente = comanda.itens.find(
          item => item.id === produto.id
        )

        if (itemExistente) {
          return {
            ...comanda,

            itens: comanda.itens.map(item =>
              item.id === produto.id
                ? {
                    ...item,
                    quantidade: item.quantidade + 1,
                  }
                : item
            ),
          }
        }

        return {
          ...comanda,

          itens: [
            ...comanda.itens,
            {
              ...produto,
              quantidade: 1,
            },
          ],
        }
      })
    )
  }

  // Altera a quantidade de produtos
  function alterarQuantidade(id, variacao) {
    setComandas(atual =>
      atual.map(comanda => {
        if (comanda.id !== comandaSelecionada) {
          return comanda
        }

        return {
          ...comanda,

          itens: comanda.itens
            .map(item =>
              item.id === id
                ? {
                    ...item,
                    quantidade: item.quantidade + variacao,
                  }
                : item
            )
            .filter(item => item.quantidade > 0),
        }
      })
    )
  }

  // Cancela uma comanda
  function cancelarComanda() {
    if (!selecionada) return

    const motivo = window.prompt(
      'Informe o motivo do cancelamento:'
    )

    if (!motivo || !motivo.trim()) return

    const registro = {
      id: selecionada.id,
      nome: selecionada.nome,
      motivo: motivo.trim(),
      data: new Date().toLocaleString('pt-BR'),
    }

    setCancelamentos(atual => [...atual, registro])

    setComandas(atual =>
      atual.map(comanda =>
        comanda.id === selecionada.id
          ? { ...comanda, status: 'cancelada' }
          : comanda
      )
    )

    setComandaSelecionada(null)
  }

  // Abre a janela de pagamento
  function abrirPagamento() {
    if (!selecionada || selecionada.itens.length === 0) {
      return
    }

    setModalPagamento(true)
  }

  // Finaliza uma venda
  function finalizarVenda(dadosPagamento) {
    if (!selecionada) return

    const total = selecionada.itens.reduce(
      (soma, item) =>
        soma + item.preco * item.quantidade,
      0
    )

    if (total <= 0) return

    const novaVenda = {
      id: Date.now(),
      nome: selecionada.nome,
      itens: selecionada.itens,
      total,
      pagamento: dadosPagamento.formaPagamento,
      valorRecebido: dadosPagamento.valorRecebido,
      troco: dadosPagamento.troco,
      data: new Date().toLocaleString('pt-BR'),
    }

    setVendas(atual => [novaVenda, ...atual])

    setComandas(atual =>
      atual.map(comanda =>
        comanda.id === selecionada.id
          ? { ...comanda, status: 'fechada' }
          : comanda
      )
    )

    setModalPagamento(false)
    setComandaSelecionada(null)
  }

  return (
    <div className="caixa-container">
        <Navbar />
        
    <main className="caixa-page">
      
      <CaixaHeader />

      <CaixaResumo
        comandas={comandas}
        vendas={vendas}
        cancelamentos={cancelamentos}
      />

      <CaixaPagamentos
        vendas={vendas}
      />

      <section className="caixa-operacao">

        <ListaComandas
          comandas={comandas}
          selecionada={comandaSelecionada}
          onSelecionar={setComandaSelecionada}
          nomeCliente={nomeCliente}
          setNomeCliente={setNomeCliente}
          onAbrirComanda={abrirComanda}
        />

        <CatalogoProdutos
          comandaSelecionada={selecionada}
          onAdicionarProduto={adicionarProduto}
        />

        <ResumoComanda
          comanda={selecionada}
          onAlterarQuantidade={alterarQuantidade}
          onFinalizar={abrirPagamento}
          onCancelar={cancelarComanda}
        />

      </section>

      <HistoricoVendas
        vendas={vendas}
      />

      {modalPagamento && selecionada && (
        <ModalPagamento
          total={selecionada.itens.reduce(
            (soma, item) =>
              soma + item.preco * item.quantidade,
            0
          )}
          onConfirmar={finalizarVenda}
          onFechar={() => setModalPagamento(false)}
        />
        
      )}

    </main>
    </div>
  )
}

export default Caixa
