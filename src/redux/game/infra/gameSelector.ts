import { TeamsDetailsType } from "./../../../type/game"
import { Maybe } from "./../../../type/utils"
import { AppState } from "../../AppState.interface"

export function getWordNumberSelector({ game }: AppState): Maybe<number> {
  return game.wordNumber
}

export function getRoundNumberSelector({ game }: AppState): Maybe<number> {
  return game.roundNumber
}
export function getRoundDurationSelector({ game }: AppState): Maybe<number> {
  return game.roundDuration
}
export function getCurrentIndexTeamSelector({ game }: AppState): Maybe<number> {
  return game.currentIndexTeam
}
export function getTeamsDetailsSelector({ game }: AppState): TeamsDetailsType {
  return game.teamsDetails
}

export function getWordToGuessSelector({ game }: AppState): Maybe<string[]> {
  const teamsDetails = game.teamsDetails
  const currentIndexTeam = game.currentIndexTeam
  const currentTeamDetails = teamsDetails.find(
    team => team.id === currentIndexTeam
  )
  return currentTeamDetails?.wordsToGuess
}
export function getnumberOfTeamsSelector({ game }: AppState): number {
  return game.numberOfTeams
}
