import { Words } from "../../../type/word"

type Action = {
  type: string
  payload: any
}
const initialState: Words = {
  words: [],
  status: "idle",
  error: null
}

export const wordReducer = (state = initialState, action: Action): Words => {
  switch (action.type) {
    case "GET_ALL_WORDS_SUCCESS": {
      return { words: action.payload, status: "success", error: null }
    }
    case "ADD_WORDS": {
      return {
        ...state,
        status: "idle",
        error: null
      }
    }
    case "ADD_WORDS_SUCCESS": {
      return {
        ...state,
        status: "success",
        error: null
      }
    }
    case "ADD_WORDS_FAILURE": {
      return {
        ...state,
        error: action.payload,
        status: "error"
      }
    }
    default:
      return state
  }
}
