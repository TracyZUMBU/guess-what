import { AppState } from "../../AppState.interface"

export function getWordNumberSelector({ game }: AppState) {
  return game.wordNumber
}

export function getRoundNumberSelector({ game }: AppState) {
  return game.roundNumber
}
export function getRoundDurationSelector({ game }: AppState) {
  return game.roundDuration
}
