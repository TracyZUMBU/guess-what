import { TeamsDetailsType } from "../type/game"
import { Words } from "../type/word"

export type Game = {
  wordNumber: number | null
  roundNumber: number | null
  roundDuration: number | null
  teamsDetails: TeamsDetailsType
  currentIndexTeam: number
  numberOfTeams: number
}

export interface AppState {
  words: Words
  game: Game
}
