import PokemonCard from './PokemonCard'

function PokemonList({ pokemons, theme, onSelect }) {
  return (
    <ul className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} theme={theme} onSelect={onSelect} />
      ))}
    </ul>
  )
}

export default PokemonList
