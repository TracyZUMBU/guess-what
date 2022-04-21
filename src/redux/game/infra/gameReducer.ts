import { Game } from "../../AppState.interface"

type Action = {
  type: string
  payload: number
}

const initialState: Game = { wordNumber: null, roundNumber: null }

export const gameReducer = (state = initialState, action: Action) => {
  console.log("state:", state)
  switch (action.type) {
    case "SET_NUM_OF_WORDS": {
      return { ...state, wordNumber: action.payload }
    }
    case "SET_NUM_OF_ROUND": {
      return { ...state, roundNumber: action.payload }
    }

    default:
      return state
  }
}
