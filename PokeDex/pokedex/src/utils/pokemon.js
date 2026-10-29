const SPRITES_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

// Imagens do repositório de sprites da PokéAPI (fonte externa, documentada no README):
// visual clássico = pixel art de FireRed/LeafGreen (GBA), visual moderno = renders 3D do Pokémon HOME
export function getSpriteUrl(id, theme) {
  if (theme === 'classic') {
    return `${SPRITES_URL}/versions/generation-iii/firered-leafgreen/${id}.png`
  }
  return `${SPRITES_URL}/other/home/${id}.png`
}

export function formatId(id) {
  return `#${String(id).padStart(3, '0')}`
}

export const STAT_LABELS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  specialAttack: 'Atq. Esp.',
  specialDefense: 'Def. Esp.',
  speed: 'Velocidade',
}

// Maior valor base possível de um atributo, usado como 100% nas barras
export const MAX_STAT = 255

// Nome oficial em português e cor de cada tipo (as chaves são os nomes do JSON)
export const TYPES = {
  Normal: { label: 'Normal', color: '#A8A77A' },
  Fire: { label: 'Fogo', color: '#EE8130' },
  Water: { label: 'Água', color: '#6390F0' },
  Grass: { label: 'Planta', color: '#7AC74C' },
  Electric: { label: 'Elétrico', color: '#F7D02C' },
  Ice: { label: 'Gelo', color: '#96D9D6' },
  Fighting: { label: 'Lutador', color: '#C22E28' },
  Poison: { label: 'Venenoso', color: '#A33EA1' },
  Ground: { label: 'Terrestre', color: '#E2BF65' },
  Flying: { label: 'Voador', color: '#A98FF3' },
  Psychic: { label: 'Psíquico', color: '#F95587' },
  Bug: { label: 'Inseto', color: '#A6B91A' },
  Rock: { label: 'Pedra', color: '#B6A136' },
  Ghost: { label: 'Fantasma', color: '#735797' },
  Dark: { label: 'Sombrio', color: '#705746' },
  Dragon: { label: 'Dragão', color: '#6F35FC' },
  Steel: { label: 'Aço', color: '#B7B7CE' },
}

export function typeInfo(name) {
  return TYPES[name] ?? { label: 'Sem tipo', color: '#9E9E9E' }
}

// Cor do primeiro tipo, usada nos fundos e destaques do card e da Pokédex
export function mainColor(pokemon) {
  return typeInfo(pokemon.types[0]?.name).color
}
