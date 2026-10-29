const THEMES = [
  { id: 'classic', label: 'Clássico', hint: 'Estilo GBA' },
  { id: 'modern', label: 'Moderno', hint: 'Estilo Switch' },
]

function ThemeToggle({ theme, onChange }) {
  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Visual da Pokédex">
      {THEMES.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={theme === option.id}
          className={`theme-option ${theme === option.id ? 'active' : ''}`}
          onClick={() => onChange(option.id)}
        >
          <span className="theme-option-label">{option.label}</span>
          <span className="theme-option-hint">{option.hint}</span>
        </button>
      ))}
    </div>
  )
}

export default ThemeToggle
