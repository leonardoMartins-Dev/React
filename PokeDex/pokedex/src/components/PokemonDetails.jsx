import { useEffect, useState } from 'react'
import { Modal } from '@mantine/core'
import TypeBadge from './TypeBadge'
import { fetchDexEntry } from '../services/pokeapi'
import { getSpriteUrl, formatId, mainColor, STAT_LABELS, MAX_STAT } from '../utils/pokemon'
import './PokemonDetails.css'

function formatNumber(value) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })
}

// O aparelho em si. Recebe key={pokemon.id}, então ao trocar de Pokémon ele é recriado
// (estado da busca zera e as barras animam de novo)
function Pokedex({ pokemon, theme, onClose, onPrev, onNext }) {
  const [entry, setEntry] = useState(null)
  const [failed, setFailed] = useState(false)

  // Descrição, categoria, altura e peso vêm da PokéAPI (o JSON local não tem)
  useEffect(() => {
    let ignore = false
    fetchDexEntry(pokemon.id)
      .then((data) => !ignore && setEntry(data))
      .catch(() => !ignore && setFailed(true))
    return () => {
      ignore = true
    }
  }, [pokemon.id])

  // Setas do teclado navegam entre os Pokémon, como o D-pad
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onPrev, onNext])

  const flavorText = entry && (theme === 'classic' ? entry.classicText : entry.modernText)
  const total = Object.values(pokemon.stats).reduce((sum, value) => sum + value, 0)
  const loadingText = failed ? 'Não foi possível carregar a descrição.' : 'Carregando dados...'

  return (
    <article className="dex" style={{ '--type-color': mainColor(pokemon) }}>
      <section className="dex-left">
        <div className="dex-top" aria-hidden="true">
          <span className="dex-lens" />
          <span className="dex-light dex-light-red" />
          <span className="dex-light dex-light-yellow" />
          <span className="dex-light dex-light-green" />
        </div>

        <div className="dex-screen-frame">
          <div className="dex-screen">
            <span className="dex-number">{formatId(pokemon.id)}</span>
            <img src={getSpriteUrl(pokemon.id, theme)} alt={pokemon.name} />
          </div>
        </div>

        <div className="dex-controls">
          <span className="dex-round-button" aria-hidden="true" />
          <dl className="dex-lcd">
            <div>
              <dt>Altura</dt>
              <dd>{entry ? `${formatNumber(entry.height)} m` : '--'}</dd>
            </div>
            <div>
              <dt>Peso</dt>
              <dd>{entry ? `${formatNumber(entry.weight)} kg` : '--'}</dd>
            </div>
          </dl>
          <div className="dex-dpad">
            <button type="button" className="dex-dpad-prev" onClick={onPrev} aria-label="Pokémon anterior">
              ◀
            </button>
            <button type="button" className="dex-dpad-next" onClick={onNext} aria-label="Próximo Pokémon">
              ▶
            </button>
          </div>
        </div>
      </section>

      <div className="dex-hinge" aria-hidden="true" />

      <section className="dex-right">
        <div className="dex-info">
          <h2 className="dex-name">{pokemon.name}</h2>
          <p className="dex-genus">{entry?.genus ?? (failed ? 'Pokémon' : '...')}</p>
          <div className="types">
            {pokemon.types.length === 0 && <TypeBadge name={null} />}
            {pokemon.types.map((type) => (
              <TypeBadge key={type.id} name={type.name} />
            ))}
          </div>
          <p className="dex-flavor">{flavorText ?? loadingText}</p>
        </div>

        <div className="dex-stats">
          {Object.entries(STAT_LABELS).map(([key, label]) => (
            <div className="dex-stat" key={key}>
              <span className="dex-stat-label">{label}</span>
              <span className="dex-stat-value">{pokemon.stats[key]}</span>
              <span className="dex-stat-bar">
                <span style={{ '--value': pokemon.stats[key] / MAX_STAT }} />
              </span>
            </div>
          ))}
          <p className="dex-stat-total">
            Total <strong>{total}</strong>
          </p>
        </div>

        <div className="dex-keys" aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      </section>

      <button type="button" className="dex-close" onClick={onClose} aria-label="Fechar Pokédex" data-autofocus>
        ✕
      </button>
    </article>
  )
}

function PokemonDetails({ pokemon, theme, onClose, onPrev, onNext }) {
  // Guarda o último Pokémon aberto para o conteúdo não sumir durante a animação de fechar
  const [lastPokemon, setLastPokemon] = useState(pokemon)
  if (pokemon && pokemon !== lastPokemon) {
    setLastPokemon(pokemon)
  }
  const current = pokemon ?? lastPokemon

  return (
    <Modal
      opened={pokemon !== null}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="auto"
      padding={0}
      classNames={{ content: 'dex-modal-content', body: 'dex-modal-body' }}
      overlayProps={{ backgroundOpacity: 0.7, blur: 4 }}
      transitionProps={{ transition: 'pop', duration: 220 }}
    >
      {current && (
        <Pokedex
          key={current.id}
          pokemon={current}
          theme={theme}
          onClose={onClose}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </Modal>
  )
}

export default PokemonDetails
