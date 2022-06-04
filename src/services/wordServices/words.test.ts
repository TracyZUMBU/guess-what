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
    const store = configureStore({})
    const wordsToAdd = ["Gamelle, assiette, pied, dents"]
    // const initialState = store.getState()
    store.dispatch(addWords(wordsToAdd))
    // const state: AppState = {
    //   ...initialState,
    //   words: {
    //     ...initialState.words,
    //     words: ["Eléphant", "Bateau"]
    //   }
    // }

    expect(store.getState().words.isWordsAdded).toStrictEqual({
      status: true,
      isLoading: false,
      error: null
    })
  })
})
