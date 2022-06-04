import { AppState } from "../../AppState.interface"

export function getWordsSelector({ words }: AppState) {
  return words.words
}
