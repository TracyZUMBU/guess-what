import { Words } from "../type/word"

export type Game = {
  wordNumber: number | null
  roundNumber: number | null
  roundDuration: number | null
  wordsToGuessByTeam: string[][]
  currentTeam: number
}

export interface AppState {
  words: Words
  game: Game
}
