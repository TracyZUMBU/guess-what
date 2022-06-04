import { Dependencies } from "../.."
import { ThunkResult } from "../../configureStore"

export const getAllWords =
  (): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { wordsGateway }: Dependencies) => {
    try {
      const words = await wordsGateway.getAllWords()
      dispatch({ type: "GET_ALL_WORDS", payload: words })
    } catch (error) {
      console.log("error:", error)
    }
  }

export const addWords =
  (words: string[]): ThunkResult<Promise<void>> =>
  async (dispatch, getState, { wordsGateway }: Dependencies) => {
    try {
      dispatch({ type: "ADD_WORDS", payload: false, isLoading: true })
      await wordsGateway.addWords(words)
      dispatch({ type: "ADD_WORDS_SUCCESS", payload: true, isLoading: false })
    } catch (error) {
      console.log("error:", error)
      dispatch({ type: "ADD_WORDS_FAILURE", payload: error, isLoading: false })
    }
  }
