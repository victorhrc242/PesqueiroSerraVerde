
function EstoqueFiltros({
  busca,
  setBusca,
  categoria,
  setCategoria,
  status,
  setStatus
}) {
  return (
    <div className="estoque-filtros">

      <div className="filtro-busca">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
      >
        <option value="Todas">Todas as categorias</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Porções">Porções</option>
        <option value="Outros">Outros</option>
      </select>

      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="Todos">Todos os status</option>
        <option value="Normal">Normal</option>
        <option value="Baixo">Estoque baixo</option>
        <option value="Zerado">Sem estoque</option>
      </select>

    </div>
  )
}

export default EstoqueFiltros
