type WordReducer = []

type Action = {
  type: string
  payload: any
}

const initialState: WordReducer = []

export const wordReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "GET_ALL_WORDS": {
      return action.payload
    }

    default:
      return state
  }
}
