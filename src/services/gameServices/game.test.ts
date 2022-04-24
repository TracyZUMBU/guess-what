import { AppState } from "../../redux/AppState.interface"
import { configureStore } from "../../redux/configureStore"
import {
  getRoundDurationSelector,
  getRoundNumberSelector,
  getWordNumberSelector
} from "../../redux/game/infra/gameSelector"

describe("getWordNumberSelector", () => {
  it("should get the value of getWordNumberSelector", () => {
    const store = configureStore({})
    const initialState = store.getState()

    const state: AppState = {
      ...initialState,
      game: {
        wordNumber: 5,
        roundNumber: null,
        roundDuration: null,
        wordsToGuessByTeam: []
      }
    }

    expect(getWordNumberSelector(state)).toBe(5)
  })
})

describe("getRoundNumberSelector", () => {
  it("should get the value of getRoundNumberSelector", () => {
    const store = configureStore({})
    const initialState = store.getState()

    const state: AppState = {
      ...initialState,
      game: {
        wordNumber: null,
        roundNumber: 3,
        roundDuration: null,
        wordsToGuessByTeam: []
      }
    }

    expect(getRoundNumberSelector(state)).toBe(3)
  })
})

describe("getRoundDurationSelector", () => {
  it("should get the value of getRoundNumberSelector", () => {
    const store = configureStore({})
    const initialState = store.getState()

    const state: AppState = {
      ...initialState,
      game: {
        wordNumber: null,
        roundNumber: null,
        roundDuration: 90,
        wordsToGuessByTeam: []
      }
    }

    expect(getRoundDurationSelector(state)).toBe(90)
  })
})
