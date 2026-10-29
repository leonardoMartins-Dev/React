import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  // estado inicial lido do localStorage pelo service
  const [votos, setVotos] = useState(() => obterVotos());

  // valores derivados do estado: calculados a cada renderização, sem outro useState
  const total = calcularTotalVotos(votos);
  const placar = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Tem certeza que deseja zerar a votação?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina">
      <h1 className="pagina-titulo">Parcial da eliminação</h1>
      <p className="total-votos">
        <strong>{total}</strong> votos computados
      </p>

      {total === 0 ? (
        <div className="resultado-vazio">
          <p>Nenhum voto ainda. Escolha quem sai da roça para ver a parcial.</p>
          <Link to="/votacao" className="botao botao-principal">Ir para a votação</Link>
        </div>
      ) : (
        <>
          <ol className="placar">
            {placar.map((p, index) => (
              <li key={p.id} className={index === 0 ? 'placar-item placar-lider' : 'placar-item'}>
                <img src={p.foto} alt={p.nome} className="placar-foto" />

                <div className="placar-info">
                  <h3>
                    {p.nome}
                    {index === 0 && <span className="selo-lider">Sairia hoje</span>}
                  </h3>

                  <div className="barra">
                    <div className="barra-preenchida" style={{ width: `${p.percentual}%` }}></div>
                  </div>

                  <p className="placar-numeros">
                    {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% ({p.votos}{' '}
                    {p.votos === 1 ? 'voto' : 'votos'})
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <button type="button" className="botao botao-zerar" onClick={handleZerar}>
            Zerar votação
          </button>
        </>
      )}
    </main>
  );
}

export default Resultado;