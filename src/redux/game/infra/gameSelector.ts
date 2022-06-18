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
  const words = game.currentTeam?.wordsToGuess
  if (!words) {
    throw new Error("Error when getting word to guess")
  }
  return words
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
  getTeamsDetailsSelector,
  getRoundNumberSelector,
  (teams, numberOfRound) => {
    const hasTeamFinishHisMatch = teams.map(
      team => team.round === numberOfRound || team.wordsToGuess.length === 0
    )
    return hasTeamFinishHisMatch.every(el => el === true)
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
  if (biggestScore === 0) {
    return []
  }
  return teams.filter(team => team.points === biggestScore)
}
