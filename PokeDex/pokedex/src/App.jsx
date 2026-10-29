import { useCallback, useLayoutEffect, useState } from 'react'
import data from './data/pokedex-data.json'
import IntroAnimation from './components/IntroAnimation'
import Pokeball from './components/Pokeball'
import ThemeToggle from './components/ThemeToggle'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import TrainerList from './components/TrainerList'
import ViewTabs from './components/ViewTabs'
import { readStorage, writeStorage } from './utils/storage'
import './App.css'
import './themes/classic.css'
import './themes/modern.css'

const pokemons = data.pokemon
const pokemonById = new Map(pokemons.map((pokemon) => [pokemon.id, pokemon]))

// Junta cada treinador com os dados completos dos seus Pokémon (o JSON só traz os IDs)
const trainers = data.trainers.map((trainer) => ({
  ...trainer,
  team: trainer.pokemonIds.map((id) => pokemonById.get(id)),
}))

// Só os tipos que algum Pokémon realmente tem (o JSON também traz "Typeless" e "Dark", sem nenhum)
const availableTypes = data.types.filter((type) =>
  pokemons.some((pokemon) => pokemon.types.some((t) => t.id === type.id)),
)

// Quem pede menos animação no sistema não vê a intro
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function App() {
  const [theme, setTheme] = useState(() => (readStorage('theme') === 'modern' ? 'modern' : 'classic'))
  const [showIntro, setShowIntro] = useState(!prefersReducedMotion)
  const [introPokemon] = useState(() => pokemons[Math.floor(Math.random() * pokemons.length)])
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState(null)
  const [view, setView] = useState('pokedex')
  const [selectedId, setSelectedId] = useState(null)
  // Lista que as setas da Pokédex percorrem: a lista filtrada ou o time do treinador
  const [browseIds, setBrowseIds] = useState([])

  // O tema vai no <html> para valer também no modal (que o Mantine renderiza fora do App)
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    writeStorage('theme', theme)
  }, [theme])

  const finishIntro = useCallback(() => setShowIntro(false), [])

  // Estado derivado: a lista filtrada é calculada a partir da busca e do tipo, sem useState próprio
  const term = search.trim().toLowerCase().replace('#', '')
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch =
      pokemon.name.toLowerCase().includes(term) || String(pokemon.id).includes(term)
    const matchesType =
      selectedType === null || pokemon.types.some((type) => type.id === selectedType)
    return matchesSearch && matchesType
  })

  const selectedPokemon = pokemonById.get(selectedId) ?? null

  function openPokemon(id, ids) {
    setSelectedId(id)
    setBrowseIds([...new Set(ids)]) // sem repetidos (ex.: os 3 Venonat do Koga)
  }

  // Anterior/próximo dando a volta no começo e no fim da lista
  function showNeighbor(step) {
    const index = browseIds.indexOf(selectedId)
    const next = (index + step + browseIds.length) % browseIds.length
    setSelectedId(browseIds[next])
  }

  function clearFilters() {
    setSearch('')
    setSelectedType(null)
  }

  return (
    <>
      {showIntro && <IntroAnimation pokemon={introPokemon} theme={theme} onFinish={finishIntro} />}

      <header className="app-header">
        <div className="app-header-inner">
          <div className="brand">
            <Pokeball className="brand-icon" />
            <div>
              <h1>Pokédex</h1>
              <p>{pokemons.length} Pokémon de Kanto</p>
            </div>
          </div>
          <ViewTabs view={view} onChange={setView} />
          <ThemeToggle theme={theme} onChange={setTheme} />
        </div>
      </header>

      <main className="app">
        {view === 'pokedex' ? (
          <>
            <div className="toolbar">
              <SearchBar value={search} onChange={setSearch} />
              <TypeFilter types={availableTypes} selected={selectedType} onSelect={setSelectedType} />
            </div>

            <p className="result-count">{filteredPokemons.length} Pokémon encontrados</p>

            {filteredPokemons.length === 0 ? (
              <div className="empty">
                <p>Nenhum Pokémon encontrado com esses filtros.</p>
                <button type="button" className="filter-button active" onClick={clearFilters}>
                  Limpar filtros
                </button>
              </div>
            ) : (
              <PokemonList
                pokemons={filteredPokemons}
                theme={theme}
                onSelect={(id) => openPokemon(id, filteredPokemons.map((pokemon) => pokemon.id))}
              />
            )}
          </>
        ) : (
          <>
            <p className="result-count">{trainers.length} treinadores de Kanto</p>
            <TrainerList trainers={trainers} theme={theme} onSelectPokemon={openPokemon} />
          </>
        )}
      </main>

      <PokemonDetails
        pokemon={selectedPokemon}
        theme={theme}
        onClose={() => setSelectedId(null)}
        onPrev={() => showNeighbor(-1)}
        onNext={() => showNeighbor(1)}
      />
    </>
  )
}

export default App
