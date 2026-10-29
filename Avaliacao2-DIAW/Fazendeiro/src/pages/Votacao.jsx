import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

function Votacao() {
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  // último participante que recebeu voto e quantas vezes o usuário votou desde que abriu a página
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [quantidadeVotos, setQuantidadeVotos] = useState(0);

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setQuantidadeVotos((qtd) => qtd + 1);
  }

  return (
    <main className="pagina">
      <h1 className="pagina-titulo">Quem você quer eliminar?</h1>
      <p className="pagina-subtitulo">Cada clique conta um voto para tirar o peão da fazenda.</p>

      {ultimoVoto !== null && (
        <div className="mensagem-voto">
          <span>
            Voto registrado para eliminar <strong>{ultimoVoto.nome}</strong>. Você já votou{' '}
            {quantidadeVotos} {quantidadeVotos === 1 ? 'vez' : 'vezes'}.
          </span>
          <Link to="/resultado">Ver resultado</Link>
        </div>
      )}

      <section className="grade-roca">
        {naRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
        ))}
      </section>

      <h2 className="secao-titulo">Demais peões</h2>
      <p className="pagina-subtitulo">Fora da roça nesta semana, não podem receber votos.</p>

      <section className="grade-peoes">
        {foraDaRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} />
        ))}
      </section>
    </main>
  );
}

export default Votacao;