import { Game, AppState } from "./../../AppState.interface"
import { Words } from "./../../../type/word"
import { Team, Teams } from "./../../../type/game"
import { Maybe } from "./../../../type/utils"

import { createSelector, OutputSelectorFields } from "reselect"

const MILLISECONDS = 1000

type CurrentTeamScore = ((state: {
  words: Words
  game: Game
}) => number | undefined) &
  OutputSelectorFields<
    (
      args_0: Maybe<number>,
      args_1: Teams
    ) => number & {
      clearCache: () => void
    }
  > & {
    clearCache: () => void
  }

export function getWordNumberSelector({ game }: AppState): Maybe<number> {
  return game.wordNumber
}

export function getRoundNumberSelector({ game }: AppState): Maybe<number> {
  return game.roundNumber
}
export function getRoundDurationSelector({ game }: AppState): Maybe<number> {
  if (game.roundDuration) {
    return game.roundDuration * MILLISECONDS
  } else {
    return game.roundDuration
  }
}
export function getCurrentIndexTeamSelector({ game }: AppState): Maybe<number> {
  return game.currentIndexTeam
}
export function getTeamsDetailsSelector({ game }: AppState): Teams {
  return game.teams
}

export function getWordToGuessSelector({ game }: AppState): string[] {
  return game.teams.find(team => team.isPlaying === true)
    ?.wordsToGuess as string[]
}

export function getnumberOfTeamsSelector({ game }: AppState): number {
  return game.numberOfTeams
}

export function getCurrentRoundSelector({ game }: AppState): number {
  return game.currentRound
}

export const checkIfAllWordsHaveBeenGuessed = createSelector(
  getTeamsDetailsSelector,
  details => {
    const wordsToGuessByTeam = details.map(el => {
      return el.wordsToGuess
    })
    return wordsToGuessByTeam.every(words => words.length === 0)
  }
)

export const checkIfAtLeastOneTeamHaveBeenGuessedAllTheirWords = createSelector(
  getTeamsDetailsSelector,
  details => {
    const wordsToGuessByTeam = details.map(el => {
      return el.wordsToGuess
    })
    return wordsToGuessByTeam.some(words => words.length === 0)
  }
)

export const isGameOverSelector = createSelector(
  checkIfAllWordsHaveBeenGuessed,
  getTeamsDetailsSelector,
  getRoundNumberSelector,
  (isAllWordsGuessed, teams, numberOfRound) => {
    const isAllRoundOver = teams.every(team => team.round === numberOfRound)
    return isAllRoundOver || isAllWordsGuessed
  }
)

export const getCurrentTeamScore: CurrentTeamScore = createSelector(
  [getCurrentIndexTeamSelector, getTeamsDetailsSelector],
  (index, teams) => {
    const currentTeam = teams.find(team => team.id === index)
    return currentTeam?.points
  }
)

export function getWinnersTeams(state: AppState): Teams {
  const teams = state.game.teams
  const biggestScore = Math.max(...teams.map(team => team.points))
  return teams.filter(team => team.points === biggestScore)
}
