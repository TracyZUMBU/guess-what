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
