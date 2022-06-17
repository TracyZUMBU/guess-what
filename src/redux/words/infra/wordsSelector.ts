import { Words } from "./../../../type/word"
import { shuffleArray } from "../../../helpers/functions"
import { AppState } from "../../AppState.interface"

export function getWordsSelector({ words }: AppState): string[] {
  const wordsInOriginalOrder = words.words
  return shuffleArray(wordsInOriginalOrder)
}

export function getAddWordsStatusSelector({ words }: AppState): Words {
  return words
}
