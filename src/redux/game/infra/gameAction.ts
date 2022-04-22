export const setNumberOfWords = (payload: number) => {
  return { type: "SET_NUM_OF_WORDS", payload }
}

export const setNumberOfRound = (payload: number) => {
  return { type: "SET_NUM_OF_ROUND", payload }
}

export const setDurationByRound = (payload: number) => {
  return { type: "SET_DURATION_BY_ROUND", payload }
}

export const setWordsToGuessByTeam = (payload: string[][]) => {
  return { type: "SET_WORDS_TO_GUESS_BY_TEAM", payload }
}
