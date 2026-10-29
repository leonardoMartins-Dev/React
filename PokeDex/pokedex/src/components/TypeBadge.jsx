import { typeInfo } from '../utils/pokemon'

function TypeBadge({ name }) {
  const { label, color } = typeInfo(name)

  return (
    <span className="type-badge" style={{ '--type-color': color }}>
      {label}
    </span>
  )
}

export default TypeBadge
