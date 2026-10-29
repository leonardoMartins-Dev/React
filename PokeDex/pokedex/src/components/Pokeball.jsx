// Pokébola em SVG; as metades ficam em grupos separados para a animação de abrir na intro
function Pokeball({ className = '' }) {
  return (
    <svg className={`pokeball ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <g className="pokeball-top">
        <path d="M5 50 A45 45 0 0 1 95 50 Z" fill="#E3350D" stroke="#1E1E1E" strokeWidth="6" />
        <ellipse className="pokeball-shine" cx="34" cy="26" rx="10" ry="6" fill="#fff" opacity="0.45" />
      </g>
      <g className="pokeball-bottom">
        <path d="M5 50 A45 45 0 0 0 95 50 Z" fill="#F4F4F4" stroke="#1E1E1E" strokeWidth="6" />
        <circle cx="50" cy="50" r="14" fill="#F4F4F4" stroke="#1E1E1E" strokeWidth="6" />
        <circle className="pokeball-button" cx="50" cy="50" r="6" fill="#fff" stroke="#1E1E1E" strokeWidth="2" />
      </g>
    </svg>
  )
}

export default Pokeball
