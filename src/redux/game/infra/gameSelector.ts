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

export const checkIfAllWordsHaveBeenGuessed = createSelector(
  getTeamsDetailsSelector,
  details => {
    const wordsToGuessByTeam = details.map(el => {
      return el.wordsToGuess
    })
    return wordsToGuessByTeam.every(words => words.length === 0)
  }
)
