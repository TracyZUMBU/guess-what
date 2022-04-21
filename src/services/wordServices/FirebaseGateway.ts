import { collection, getDocs } from "firebase/firestore"
import db from "../../config/firebase"
import { IWordGateway } from "./Word.interface"

export class WordsGateway implements IWordGateway {
  async getAllWords() {
    const wordsCol = collection(db, "words")
    const citySnapshot = await getDocs(wordsCol)
    const wordsList = citySnapshot.docs.map(doc => doc.data())
    return wordsList as unknown as string[]
  }
}
