// Dados extras da Pokédex (descrição, categoria, altura e peso) vindos da PokéAPI,
// já que o JSON local só tem nome, tipos e atributos
const API_URL = 'https://pokeapi.co/api/v2'

// Versões de onde sai o texto no visual clássico, em ordem de preferência
const CLASSIC_VERSIONS = ['firered', 'leafgreen', 'yellow', 'red']

// Guarda as requisições já feitas para não buscar o mesmo Pokémon duas vezes
const cache = new Map()

function toJson(response) {
  if (!response.ok) throw new Error(`PokéAPI respondeu ${response.status}`)
  return response.json()
}

// Os textos dos jogos vêm com quebras de linha e hifenização do console; deixamos em uma linha só
function cleanText(text) {
  return text.replace(/­\s*/g, '').replace(/\s+/g, ' ').trim()
}

function pickFlavorText(entries, versions) {
  const english = entries.filter((entry) => entry.language.name === 'en')
  const preferred = versions
    .map((version) => english.find((entry) => entry.version.name === version))
    .find(Boolean)
  const entry = preferred ?? english.at(-1)
  return entry ? cleanText(entry.flavor_text) : null
}

export function fetchDexEntry(id) {
  if (!cache.has(id)) {
    const request = Promise.all([
      fetch(`${API_URL}/pokemon-species/${id}`).then(toJson),
      fetch(`${API_URL}/pokemon/${id}`).then(toJson),
    ]).then(([species, pokemon]) => ({
      genus: species.genera.find((genus) => genus.language.name === 'en')?.genus ?? null,
      classicText: pickFlavorText(species.flavor_text_entries, CLASSIC_VERSIONS),
      modernText: pickFlavorText(species.flavor_text_entries, []),
      height: pokemon.height / 10, // decímetros -> metros
      weight: pokemon.weight / 10, // hectogramas -> quilos
    }))

    // Se falhar, remove do cache para tentar de novo na próxima vez
    request.catch(() => cache.delete(id))
    cache.set(id, request)
  }
  return cache.get(id)
}
