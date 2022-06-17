import { IWordGateway } from "./Word.interface"

export class InMemoryWordsGateway implements IWordGateway {
  words: string[] = []

  fillWith(words: string[]) {
    this.words = words
  }

  getAllWords(): Promise<string[]> {
    return Promise.resolve(this.words)
  }

  addWords(words: string[]): Promise<void> {
    console.log("InMemoryWordsGateway.addWords", words)
    if (!words) {
      throw new Error("error when adding words")
    }
    return Promise.resolve()
  }
}
