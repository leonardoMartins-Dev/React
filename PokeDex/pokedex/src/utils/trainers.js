// Cores genéricas para as insígnias (uma por posição; a 9ª é para quem passou das 8 de Kanto)
export const BADGE_COLORS = [
  '#9AA5B1',
  '#4AA8FF',
  '#FFB02E',
  '#5FD068',
  '#FF7EB6',
  '#E8C547',
  '#FF5A3C',
  '#3FBF8F',
  '#B07CFF',
]

// Como o Cartão de Treinador de FireRed/LeafGreen: a cor muda conforme o progresso
const RANKS = [
  { min: 9, label: 'Ouro', color: '#F2C94C' },
  { min: 8, label: 'Prata', color: '#C0C8D8' },
  { min: 6, label: 'Bronze', color: '#D9955A' },
  { min: 3, label: 'Verde', color: '#7ED69A' },
  { min: 0, label: 'Azul', color: '#7DB8FF' },
]

export function getRank(badges) {
  return RANKS.find((rank) => badges >= rank.min)
}

// Tipo que mais aparece no time (em caso de empate, o que apareceu primeiro)
export function getFavoriteType(team) {
  const counts = new Map()
  for (const pokemon of team) {
    for (const type of pokemon.types) {
      counts.set(type.name, (counts.get(type.name) ?? 0) + 1)
    }
  }

  let favorite = null
  for (const [name, count] of counts) {
    if (favorite === null || count > counts.get(favorite)) favorite = name
  }
  return favorite
}
