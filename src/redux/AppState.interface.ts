import { Words } from "../type/word"

export type Game = {
  wordNumber: number | null
  roundNumber: number | null
}

export interface AppState {
  words: Words
  game: Game
}
