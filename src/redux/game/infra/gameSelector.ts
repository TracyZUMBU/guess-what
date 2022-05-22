import { Game, AppState } from "./../../AppState.interface"
import { Words } from "./../../../type/word"
import { TeamsDetailsType } from "./../../../type/game"
import { Maybe } from "./../../../type/utils"

import { createSelector, OutputSelectorFields } from "reselect"

const MILLISECONDS = 1000

type WordsToGuessSelectorType = ((state: {
  words: Words
  game: Game
}) => string[] | undefined) &
  OutputSelectorFields<
    (
      args_0: TeamsDetailsType,
      args_1: Maybe<number>
    ) => string[] & {
      clearCache: () => void
    }
  > & {
    clearCache: () => void
  }

type CurrentTeamScore = ((state: {
  words: Words
  game: Game
}) => number | undefined) &
  OutputSelectorFields<
    (
      args_0: Maybe<number>,
      args_1: TeamsDetailsType
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
export function getTeamsDetailsSelector({ game }: AppState): TeamsDetailsType {
  return game.teamsDetails
}

export const getWordToGuessSelector: WordsToGuessSelectorType = createSelector(
  getTeamsDetailsSelector,
  getCurrentIndexTeamSelector,
  (details, index) => {
    const currentTeamDetails = details.find(team => team.id === index)
    return currentTeamDetails?.wordsToGuess
  }
)

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
  getRoundNumberSelector,
  getCurrentRoundSelector,
  (isAllWordsGuessed, numberOfRound, currentRound) => {
    const isAllRoundOver = currentRound > (numberOfRound as number)
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

export function getWinnersTeams(state: AppState): TeamsDetailsType {
  const teams = state.game.teamsDetails
  const biggestScore = Math.max(...teams.map(team => team.points))
  return teams.filter(team => team.points === biggestScore)
}
