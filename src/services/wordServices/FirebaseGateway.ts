import db from "../../config/firebase"
import {
  arrayUnion,
  doc,
  updateDoc,
  collection,
  getDocs
} from "firebase/firestore"
import { IWordGateway } from "./Word.interface"

export class WordsGateway implements IWordGateway {
  async getAllWords() {
    const wordsCol = collection(db, "words")
    const citySnapshot = await getDocs(wordsCol)
    const wordsList = citySnapshot.docs.map(doc => doc.data())
    const wordsTodomain = wordsList.map(word => {
      const list = Object.values(word)
      return list
    })

    return wordsTodomain[0][0] as unknown as string[]
  }

  async addWords(words: string[]) {
    const wordsWithoutFalsyElements = words.filter(word => word)
    try {
      const wordRef = doc(db, "words", "KReNLsETKQQ60shW6mLQ")
      await updateDoc(wordRef, {
        words: arrayUnion(...wordsWithoutFalsyElements)
      })
    } catch (error) {
      console.log("error:", error)
      throw new Error("error when adding words")
    }
  }
}
