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
      console.log("loading")
      return {
        ...state,
        isWordsAdded: {
          ...state.isWordsAdded,
          isLoading: true,
          error: null,
          status: false
        }
      }
    }

    case "ADD_WORDS_SUCCESS": {
      console.log("success")
      return {
        ...state,
        isWordsAdded: {
          ...state.isWordsAdded,
          status: true,
          isLoading: false,
          error: null
        }
      }
    }
    case "ADD_WORDS_FAILURE": {
      console.log("failure")
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
