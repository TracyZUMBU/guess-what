import { Words } from "../../../type/word"

type Action = {
  type: string
  payload: []
}

const initialState: Words = []

export const wordReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "GET_ALL_WORDS": {
      return action.payload
    }

    default:
      return state
  }
}
