import { shuffleArray } from "../../../helpers/functions"
import { AppState } from "../../AppState.interface"

export function getWordsSelector({ words }: AppState) {
  const wordsInOriginalOrder = words.words
  return shuffleArray(wordsInOriginalOrder)
}

export function getAddWordsStatusSelector({ words }: AppState) {
  return words.isWordsAdded
}
