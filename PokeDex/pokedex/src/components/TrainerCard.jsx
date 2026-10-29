import TypeBadge from './TypeBadge'
import { getSpriteUrl, typeInfo } from '../utils/pokemon'
import { BADGE_COLORS, getFavoriteType, getRank } from '../utils/trainers'

function TrainerCard({ trainer, theme, onSelectPokemon }) {
  const favoriteType = getFavoriteType(trainer.team)
  const rank = getRank(trainer.badges)
  const teamIds = trainer.team.map((pokemon) => pokemon.id)
  // Sempre mostra os 8 espaços de Kanto, e mais se o treinador tiver mais insígnias
  const badgeSlots = Math.max(8, trainer.badges)

  return (
    <li
      className="trainer-card"
      style={{ '--rank-color': rank.color, '--type-color': typeInfo(favoriteType).color }}
    >
      <header className="trainer-header">
        <span className="trainer-avatar" aria-hidden="true">
          {trainer.name[0]}
        </span>
        <div>
          <span className="trainer-label">Cartão de Treinador</span>
          <h2 className="trainer-name">{trainer.name}</h2>
        </div>
        <span className="trainer-rank">{rank.label}</span>
      </header>

      <dl className="trainer-info">
        <div>
          <dt>Insígnias</dt>
          <dd>{trainer.badges}</dd>
        </div>
        <div>
          <dt>Pokémon</dt>
          <dd>{trainer.team.length}</dd>
        </div>
        <div>
          <dt>Tipo favorito</dt>
          <dd>
            <TypeBadge name={favoriteType} />
          </dd>
        </div>
      </dl>

      <div className="trainer-badges" role="img" aria-label={`${trainer.badges} insígnias`}>
        {Array.from({ length: badgeSlots }, (_, index) => (
          <span
            key={index}
            className={`badge-slot ${index < trainer.badges ? 'earned' : ''}`}
            style={{ '--badge-color': BADGE_COLORS[index % BADGE_COLORS.length] }}
          />
        ))}
      </div>

      <ul className="trainer-team">
        {/* O mesmo Pokémon pode aparecer repetido no time, então a key usa a posição */}
        {trainer.team.map((pokemon, index) => (
          <li key={index}>
            <button type="button" onClick={() => onSelectPokemon(pokemon.id, teamIds)}>
              <img src={getSpriteUrl(pokemon.id, theme)} alt="" loading="lazy" />
              <span>{pokemon.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default TrainerCard
