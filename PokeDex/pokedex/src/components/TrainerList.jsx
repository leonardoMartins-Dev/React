import TrainerCard from './TrainerCard'

function TrainerList({ trainers, theme, onSelectPokemon }) {
  return (
    <ul className="trainer-list">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          theme={theme}
          onSelectPokemon={onSelectPokemon}
        />
      ))}
    </ul>
  )
}

export default TrainerList
