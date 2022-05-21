import { AppState } from "../../redux/AppState.interface"
import { configureStore } from "../../redux/configureStore"
import { getWordsSelector } from "../../redux/words/infra/wordsSelector"

describe("get words", () => {
  it("should return the initial state", () => {
    const store = configureStore({})
    const initialState = store.getState()

    expect(initialState.words).toStrictEqual([])
  })
})

describe("get words selector", () => {
  it("should get current words list", () => {
    const store = configureStore({})
    const initialState = store.getState()

    const state: AppState = {
      ...initialState,
      words: ["Eléphant", "Bateau"]
    }

    expect(getWordsSelector(state)).toStrictEqual(["Eléphant", "Bateau"])
  })
})
