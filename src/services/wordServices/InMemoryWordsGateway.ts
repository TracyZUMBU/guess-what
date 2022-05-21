import { IWordGateway } from "./Word.interface"

export class InMemoryWordsGateway implements IWordGateway {
  words: [] = []

  getAllWords(): Promise<string[]> {
    return Promise.resolve(this.words)
  }
}
