import { TeamsDetailsType } from "./../../type/game"
import {
  deleteGuessingWord,
  setDurationByRound,
  setNextTeamAsCurrentTeam,
  setNumberOfRound,
  setNumberOfWords,
  setTeamDetails
} from "./../../redux/game/infra/gameAction"
import { AppState } from "../../redux/AppState.interface"
import { configureStore } from "../../redux/configureStore"
import {
  getRoundDurationSelector,
  getRoundNumberSelector,
  getWordNumberSelector
} from "../../redux/game/infra/gameSelector"
const store = configureStore({})
const initialState = store.getState()
describe("getWordNumberSelector", () => {
  it("should get the value of getWordNumberSelector", () => {
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

describe("setNumberOfWords", () => {
  it("should set wordNumer value with a specified value", () => {
    store.dispatch(setNumberOfWords(10))

    expect(store.getState().game.wordNumber).toStrictEqual(10)
  })
})

describe("setNumberOfRound", () => {
  it("should set number of round value with a specified value", () => {
    store.dispatch(setNumberOfRound(3))

    expect(store.getState().game.roundNumber).toStrictEqual(3)
  })
})

describe("setDurationByRound", () => {
  it("should set the duration of round value with a specified value", () => {
    store.dispatch(setDurationByRound(90))

    expect(store.getState().game.roundDuration).toStrictEqual(90)
  })
})

describe("setTeamDetails", () => {
  it("should set teams details value with a specified values", () => {
    const teamDetails: TeamsDetailsType = [
      { id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
    ]
    store.dispatch(setTeamDetails(teamDetails))

    expect(store.getState().game.teamsDetails).toStrictEqual(teamDetails)
  })
})

describe("setTeamDetails", () => {
  it("should delete the word which have been guessed from the object which have the id 0", () => {
    const teamDetails: TeamsDetailsType = [
      { id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
    ]
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          currentIndexTeam: 0,
          teamsDetails: teamDetails
        }
      }
    )
    const wordGuessed = "bijoux"
    const upDateteamDetails: TeamsDetailsType = [
      { id: 0, wordsToGuess: ["savon", "thé"] },
      { id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
    ]

    store.dispatch(deleteGuessingWord(wordGuessed))

    expect(store.getState().game.teamsDetails).toStrictEqual(upDateteamDetails)
  })
  it("should delete the word which have been guessed from the array of the key wordsToGuess from the object which have the id 1", () => {
    const teamDetails: TeamsDetailsType = [
      { id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
    ]
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          currentIndexTeam: 1,
          teamsDetails: teamDetails
        }
      }
    )
    const wordGuessed = "livre"
    const upDateteamDetails: TeamsDetailsType = [
      { id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { id: 1, wordsToGuess: ["peigne", "eau"] }
    ]

    store.dispatch(deleteGuessingWord(wordGuessed))

    expect(store.getState().game.teamsDetails).toStrictEqual(upDateteamDetails)
  })
})

describe("setTeamDetails", () => {
  it("should set the currentIndexTeam at 1 as the next team is team 2", () => {
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          numberOfTeams: 2,
          currentIndexTeam: 0
        }
      }
    )
    store.dispatch(setNextTeamAsCurrentTeam())

    expect(store.getState().game.currentIndexTeam).toBe(1)
  })
  it("should set the currentIndexTeam at 0 as there is no more team", () => {
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          numberOfTeams: 2,
          currentIndexTeam: 1
        }
      }
    )
    store.dispatch(setNextTeamAsCurrentTeam())

    expect(store.getState().game.currentIndexTeam).toBe(0)
  })
})
