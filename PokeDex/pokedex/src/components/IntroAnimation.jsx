import { useEffect, useState } from 'react'
import Pokeball from './Pokeball'
import { getSpriteUrl } from '../utils/pokemon'
import './IntroAnimation.css'

// Momento (ms) de cada etapa da captura. Viram variáveis CSS (--t-throw, --t-catch...)
// para as animações do CSS e os textos do React ficarem sincronizados
const TIMELINE = {
  throw: 1500, // Pokébola é arremessada
  catch: 2200, // abre e puxa o Pokémon
  drop: 2700, // fecha e cai no chão
  shake: 3150, // balança 3 vezes
  caught: 4350, // clique + estrelinhas: capturado!
  exit: 5500, // tela some
  end: 5950,
}

const timelineVars = Object.fromEntries(
  Object.entries(TIMELINE).map(([step, ms]) => [`--t-${step}`, `${ms}ms`]),
)

// Texto que aparece letra por letra, como nas caixas de diálogo dos jogos
function TypedText({ text }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current) => Math.min(current + 1, text.length))
    }, 32)
    return () => clearInterval(interval)
  }, [text])

  return (
    <p aria-live="polite">
      {text.slice(0, count)}
      {count === text.length && <span className="intro-caret">▼</span>}
    </p>
  )
}

function IntroAnimation({ pokemon, theme, onFinish }) {
  const [ready, setReady] = useState(false)
  const [step, setStep] = useState(0)

  const messages = [
    `Um ${pokemon.name} selvagem apareceu!`,
    'Você usou uma Poké Bola!',
    `Gotcha! ${pokemon.name} foi capturado!`,
  ]

  // Espera a imagem do Pokémon carregar, mas no máximo 2s (rede lenta não trava a intro)
  useEffect(() => {
    const fallback = setTimeout(() => setReady(true), 2000)
    return () => clearTimeout(fallback)
  }, [])

  useEffect(() => {
    if (!ready) return
    const timers = [
      setTimeout(() => setStep(1), TIMELINE.throw - 300),
      setTimeout(() => setStep(2), TIMELINE.caught),
      setTimeout(onFinish, TIMELINE.end),
    ]
    return () => timers.forEach(clearTimeout)
  }, [ready, onFinish])

  // Qualquer tecla pula a intro
  useEffect(() => {
    window.addEventListener('keydown', onFinish)
    return () => window.removeEventListener('keydown', onFinish)
  }, [onFinish])

  return (
    <div
      className={`intro ${ready ? 'is-ready' : ''}`}
      style={timelineVars}
      onClick={onFinish}
      role="dialog"
      aria-label="Animação de abertura"
    >
      <div className="intro-scene">
        {/* Caixinha de HP do Pokémon selvagem, como nas batalhas */}
        <div className="intro-hud" aria-hidden="true">
          <div className="intro-hud-row">
            <span>{pokemon.name}</span>
            <span className="intro-hud-level">Nv.5</span>
          </div>
          <div className="intro-hud-hp">
            <span className="intro-hud-label">HP</span>
            <span className="intro-hud-bar">
              <span />
            </span>
          </div>
        </div>

        <div className="intro-enemy">
          <div className="intro-platform" />
          <img
            className="intro-pokemon"
            src={getSpriteUrl(pokemon.id, theme)}
            alt={pokemon.name}
            onLoad={() => setReady(true)}
            onError={() => setReady(true)}
          />
          <div className="intro-flash" />

          {/* Cada camada cuida de um movimento: lado, arco, queda, balanço e giro */}
          <div className="intro-ball-x">
            <div className="intro-ball-y">
              <div className="intro-ball-drop">
                <div className="intro-ball-shake">
                  <div className="intro-ball-spin">
                    <Pokeball />
                  </div>
                </div>
                <div className="intro-stars" aria-hidden="true">
                  <span>✦</span>
                  <span>✦</span>
                  <span>✦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {ready && (
        <div className="intro-textbox">
          <TypedText key={step} text={messages[step]} />
        </div>
      )}

      <button type="button" className="intro-skip" onClick={onFinish}>
        Pular ▸
      </button>
    </div>
  )
}

export default IntroAnimation
