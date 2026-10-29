function ParticipanteCard({ participante, onVotar }) {
  return (
    <article className={participante.naRoca ? 'card card-roca' : 'card'}>
      {participante.naRoca && <span className="selo-roca">Na roça</span>}

      <img src={participante.foto} alt={participante.nome} className="card-foto" />
      <h3 className="card-nome">{participante.nome}</h3>

      {onVotar && (
        <button
          type="button"
          className="botao botao-principal"
          onClick={() => onVotar(participante)}
        >
          Votar para eliminar
        </button>
      )}
    </article>
  );
}

export default ParticipanteCard;