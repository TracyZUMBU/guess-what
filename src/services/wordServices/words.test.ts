import { InMemoryWordsGateway } from "./InMemoryWordsGateway"
import { AppState } from "../../redux/AppState.interface"
import { configureStore } from "../../redux/configureStore"
import { addWords } from "../../redux/words/infra/wordAction"
import { getWordsSelector } from "../../redux/words/infra/wordsSelector"

describe("get words", () => {
  it("should return the initial state", () => {
    const store = configureStore({})
    const initialState = store.getState()

    expect(initialState.words).toStrictEqual({
      words: [],
      isWordsAdded: { status: false, isLoading: false, error: null }
    })
  })
})

describe("get words selector", () => {
  it("should get current words list", () => {
    const store = configureStore({})
    const initialState = store.getState()

    const state: AppState = {
      ...initialState,
      words: {
        ...initialState.words,
        words: ["Eléphant", "Bateau"]
      }
    }

    expect(getWordsSelector(state)).toStrictEqual(["Eléphant", "Bateau"])
  })
})

describe.only("addWord", () => {
  it("should add a word", () => {
    const wordsGateway = new InMemoryWordsGateway()
    const store = configureStore({ wordsGateway })
    const wordsToAdd = ["Gamelle, assiette, pied, dents"]

    store.dispatch(addWords(wordsToAdd))

    expect(store.getState().words.isWordsAdded).toStrictEqual({
      status: true,
      isLoading: false,
      error: null
    })
  })
})
