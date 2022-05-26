import { Maybe } from "yup/lib/types"
import { Team, Teams } from "../type/game"
import { Words } from "../type/word"

export type Game = {
  wordNumber: number
  roundNumber: number
  roundDuration: number
  teams: Teams
  currentIndexTeam: number
  numberOfTeams: number
  currentRound: number
  currentTeam: Maybe<Team>
}

export interface AppState {
  words: Words
  game: Game
}
