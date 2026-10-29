import { typeInfo } from '../utils/pokemon'

function TypeFilter({ types, selected, onSelect }) {
  return (
    <div className="type-filter" role="group" aria-label="Filtrar por tipo">
      <button
        type="button"
        className={`filter-button ${selected === null ? 'active' : ''}`}
        aria-pressed={selected === null}
        onClick={() => onSelect(null)}
      >
        Todos
      </button>

      {types.map((type) => {
        const { label, color } = typeInfo(type.name)
        return (
          <button
            key={type.id}
            type="button"
            className={`filter-button has-type ${selected === type.id ? 'active' : ''}`}
            style={{ '--type-color': color }}
            aria-pressed={selected === type.id}
            // Clicar de novo no tipo selecionado limpa o filtro
            onClick={() => onSelect(selected === type.id ? null : type.id)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default TypeFilter
