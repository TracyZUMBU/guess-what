import { Words } from "../../../type/word"

type Action = {
  type: string
  payload: any
}
const initialState: Words = {
  words: [],
  isWordsAdded: { status: false, isLoading: false, error: null }
}

export const wordReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "GET_ALL_WORDS": {
      return { ...state, words: action.payload }
    }
    case "ADD_WORDS": {
      return {
        ...state,
        isWordsAdded: {
          status: false,
          isLoading: true,
          error: null
        }
      }
    }
    case "ADD_WORDS_SUCCESS": {
      return {
        ...state,
        isWordsAdded: {
          status: true,
          isLoading: false,
          error: null
        }
      }
    }
    case "ADD_WORDS_FAILURE": {
      return {
        ...state,
        isWordsAdded: {
          ...state.isWordsAdded,
          error: action.payload,
          isLoading: false,
          status: false
        }
      }
    }

    default:
      return state
  }
}
