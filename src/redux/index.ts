import { InMemoryWordsGateway } from "./../services/wordServices/InMemoryWordsGateway"
import { WordsGateway } from "../services/wordServices/FirebaseGateway"
import { IWordGateway } from "../services/wordServices/Word.interface"
import { configureStore } from "./configureStore"

export interface Dependencies {
  wordsGateway: IWordGateway
}
export const wordsGateway = new WordsGateway()
// export const wordsGateway = new InMemoryWordsGateway()
const dependencies: Dependencies = {
  wordsGateway
}

export const store = configureStore(dependencies)
