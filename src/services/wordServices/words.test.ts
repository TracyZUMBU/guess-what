import { getAllWords } from "./../../redux/words/infra/wordAction"
import { InMemoryWordsGateway } from "./InMemoryWordsGateway"
import { AppState } from "../../redux/AppState.interface"
import { configureStore } from "../../redux/configureStore"
import { addWords } from "../../redux/words/infra/wordAction"
import { getWordsSelector } from "../../redux/words/infra/wordsSelector"

const store = configureStore({})
const initialState = store.getState()

describe("get words", () => {
  it("should return the initial state", () => {
    const store = configureStore({})

    expect(store.getState().words).toStrictEqual({
      words: [],
      status: "idle",
      error: null
    })
  })
})

describe("get words selector", () => {
  it("should get current words list", () => {
    const words = ["Eléphant", "Bateau"]
    const store = configureStore({})
    const initialState = store.getState()

    const state: AppState = {
      ...initialState,
      words: {
        ...initialState.words,
        words: words
      }
    }

    expect(getWordsSelector(state)).toStrictEqual(words)
  })
})

describe("addWord", () => {
  it("should add a word", async () => {
    const wordsGateway = new InMemoryWordsGateway()
    const state: AppState = {
      ...initialState,
      words: {
        ...initialState.words,
        status: "idle",
        error: null
      }
    }
    const store = configureStore({ wordsGateway }, state)
    const wordsToAdd = ["Gamelle, assiette, pied, dents"]

    await store.dispatch(addWords(wordsToAdd))

    expect(store.getState().words).toStrictEqual({
      status: "success",
      words: [],
      error: null
    })
  })
})

describe("getAllWords", () => {
  it("should return a list of words", async () => {
    const wordsInDB = ["Eléphant", "Bateau", "Gamelle, assiette, pied, dents"]
    const wordsGateway = new InMemoryWordsGateway()
    const state: AppState = {
      ...initialState,
      words: {
        words: [],
        status: "idle",
        error: null
      }
    }
    wordsGateway.fillWith(wordsInDB)
    const store = configureStore({ wordsGateway }, state)

    await store.dispatch(getAllWords())

    expect(store.getState().words).toStrictEqual({
      status: "success",
      words: wordsInDB,
      error: null
    })
  })
})
