
function CaixaHeader() {
  return (
    <header className="caixa-header">
      <div>
        <span className="caixa-eyebrow">
          SERRA VERDE / OPERAÇÃO
        </span>

        <h1>Caixa</h1>

        <p>
          Gerenciamento de comandas e vendas do pesqueiro.
        </p>
      </div>

      <div className="caixa-status">
        <span className="status-dot" />
        Caixa em operação
      </div>
    </header>
  )
}

export default CaixaHeader
