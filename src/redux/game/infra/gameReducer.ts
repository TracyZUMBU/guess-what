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
  teamsDetails: [],
  currentIndexTeam: 0,
  numberOfTeams: 2
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
    case "SET_TEAMS_DETAILS": {
      return { ...state, teamsDetails: action.payload }
    }
    case "DELETE_GUESSING_WORD": {
      return {
        ...state,
        teamsDetails: state.teamsDetails.map(details => {
          if (details.id === state.currentIndexTeam) {
            return {
              ...details,
              wordsToGuess: details.wordsToGuess.filter(
                word => word !== action.payload
              )
            }
          } else if (details.id !== state.currentIndexTeam) {
            return {
              ...details
            }
          }
        })
      }
    }
    case "SET_NEXT_TEAM_AS_CURRENT_TEAM": {
      if (state.currentIndexTeam === state.numberOfTeams - 1) {
        return { ...state, currentIndexTeam: 0 }
      } else return { ...state, currentIndexTeam: state.currentIndexTeam + 1 }
    }
    default:
      return state
  }
}
