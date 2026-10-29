import { IconSearch } from '@tabler/icons-react'
import { TextInput } from '@mantine/core'

function SearchBar({ value, onChange }) {
  return (
    <TextInput
      className="search-bar"
      classNames={{ input: 'search-input', section: 'search-icon' }}
      size="md"
      placeholder="Buscar por nome ou nº..."
      leftSection={<IconSearch size={18} stroke={2} />}
      aria-label="Buscar Pokémon"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  )
}

export default SearchBar
