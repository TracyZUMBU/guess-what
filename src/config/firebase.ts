import { initializeApp } from "firebase/app"
import "firebase/auth"
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAFwpBZswHzQ6U2cLROAHJ1OW3IhxNq7k8",
  authDomain: "test14-tracy.firebaseapp.com",
  projectId: "test14-tracy",
  storageBucket: "test14-tracy.appspot.com",
  messagingSenderId: "1082811399038",
  appId: "1:1082811399038:web:c5b77581c403753fa0512f",
  measurementId: "G-WXPEZR25H1"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const addWords = async () => {
  const wordRef = doc(db, "words", "KReNLsETKQQ60shW6mLQ")
  await updateDoc(wordRef, {
    words: arrayUnion("Eléphant", "Détermination")
  })
}

export default db
