const VIEWS = [
  { id: 'pokedex', label: 'Pokédex' },
  { id: 'trainers', label: 'Treinadores' },
]

function ViewTabs({ view, onChange }) {
  return (
    <nav className="view-tabs" aria-label="Seções">
      {VIEWS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`view-tab ${view === option.id ? 'active' : ''}`}
          aria-current={view === option.id ? 'page' : undefined}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </nav>
  )
}

export default ViewTabs
