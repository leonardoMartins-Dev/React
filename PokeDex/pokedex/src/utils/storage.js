// Acesso seguro ao localStorage: em aba anônima ou com storage bloqueado o navegador lança erro,
// então lemos/gravamos dentro de try/catch e o app continua funcionando sem salvar
export function readStorage(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Sem storage disponível: o valor vale só até recarregar a página
  }
}
