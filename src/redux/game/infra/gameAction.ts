import { TeamsDetailsType } from "../../../type/game"

export const setNumberOfWords = (payload: number) => {
  return { type: "SET_NUM_OF_WORDS", payload }
}

export const setNumberOfRound = (payload: number) => {
  return { type: "SET_NUM_OF_ROUND", payload }
}

export const setDurationByRound = (payload: number) => {
  return { type: "SET_DURATION_BY_ROUND", payload }
}

export const setTeamDetails = (payload: TeamsDetailsType) => {
  return { type: "SET_TEAMS_DETAILS", payload }
}
export const deleteGuessingWord = (payload: string) => {
  return { type: "DELETE_GUESSING_WORD", payload }
}
export const setNextTeamAsCurrentTeam = () => {
  return { type: "SET_NEXT_TEAM_AS_CURRENT_TEAM" }
}
export const passWord = (payload: string) => {
  return { type: "PASS_WORD", payload }
}
export const addOnePoint = () => {
  return { type: "ADD_ONE_POINT" }
}
