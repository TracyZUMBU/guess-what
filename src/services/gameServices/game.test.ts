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
        ...initialState.game,
        wordNumber: 5
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
        ...initialState.game,
        roundNumber: 3
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
        ...initialState.game,
        roundDuration: 90
      }
    }

    expect(getRoundDurationSelector(state)).toBe(90)
  })
})
