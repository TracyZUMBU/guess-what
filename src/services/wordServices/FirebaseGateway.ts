import { collection, getDocs } from "firebase/firestore"
import db from "../../config/firebase"
import { Words } from "../../type/word"
import { IWordGateway } from "./Word.interface"

export class WordsGateway implements IWordGateway {
  async getAllWords() {
    let words
    const wordsCol = collection(db, "words")
    const citySnapshot = await getDocs(wordsCol)
    const wordsList = citySnapshot.docs.map(doc => doc.data())
    const wordsTodomain = wordsList.map(word => {
      const list = Object.values(word)
      return list
    })

    return wordsTodomain[0][0] as unknown as Words
  }
}
