import { Game } from "../../AppState.interface"

type Action = {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}

const initialState: Game = {
  wordNumber: null,
  roundNumber: null,
  roundDuration: null,
  wordsToGuessByTeam: []
}

export const gameReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_NUM_OF_WORDS": {
      return { ...state, wordNumber: action.payload }
    }
    case "SET_NUM_OF_ROUND": {
      return { ...state, roundNumber: action.payload }
    }
    case "SET_DURATION_BY_ROUND": {
      return { ...state, roundDuration: action.payload }
    }
    case "SET_WORDS_TO_GUESS_BY_TEAM": {
      return { ...state, wordsToGuessByTeam: action.payload }
    }

    default:
      return state
  }
}
