import TypeBadge from './TypeBadge'
import { getSpriteUrl, formatId, mainColor, STAT_LABELS } from '../utils/pokemon'

function PokemonCard({ pokemon, theme, onSelect }) {
  return (
    <li className="pokemon-card" style={{ '--type-color': mainColor(pokemon) }}>
      <span className="pokemon-id">{formatId(pokemon.id)}</span>

      <div className="pokemon-sprite">
        <img src={getSpriteUrl(pokemon.id, theme)} alt="" loading="lazy" />
      </div>

      <h2 className="pokemon-name">
        {/* O botão cobre o card inteiro (via CSS), então clicar em qualquer lugar abre a Pokédex */}
        <button type="button" onClick={() => onSelect(pokemon.id)}>
          {pokemon.name}
        </button>
      </h2>

      <div className="types">
        {pokemon.types.length === 0 && <TypeBadge name={null} />}
        {pokemon.types.map((type) => (
          <TypeBadge key={type.id} name={type.name} />
        ))}
      </div>

      <dl className="stats">
        {Object.entries(STAT_LABELS).map(([key, label]) => (
          <div key={key}>
            <dt>{label}</dt>
            <dd>{pokemon.stats[key]}</dd>
          </div>
        ))}
      </dl>
    </li>
  )
}

export default PokemonCard
