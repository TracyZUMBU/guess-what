import { AppState } from "../../redux/AppState.interface"
import { configureStore } from "../../redux/configureStore"
import {
  checkIfAllWordsHaveBeenGuessed,
  checkIfAtLeastOneTeamHaveBeenGuessedAllTheirWords,
  getCurrentIndexTeamSelector,
  getCurrentRoundSelector,
  getCurrentTeamScore,
  getnumberOfTeamsSelector,
  getRoundDurationSelector,
  getRoundNumberSelector,
  getTeamsDetailsSelector,
  getWinnersTeams,
  getWordNumberSelector,
  getWordToGuessSelector,
  isGameOverSelector
} from "../../redux/game/infra/gameSelector"
import {
  addOnePoint,
  deleteGuessingWord,
  passWord,
  setDurationByRound,
  setNextTeamAsCurrentTeam,
  setNumberOfRound,
  setNumberOfWords,
  setTeamDetails
} from "./../../redux/game/infra/gameAction"
import { TeamsDetailsType } from "./../../type/game"
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

describe("getCurrentIndexTeamSelector", () => {
  it("should get the value of getCurrentIndexTeamSelector", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        currentIndexTeam: 1
      }
    }

    expect(getCurrentIndexTeamSelector(state)).toBe(1)
  })
})

describe("getTeamsDetailsSelector", () => {
  it("should get the value of getTeamsDetailsSelector", () => {
    const teamDetails: TeamsDetailsType = [
      { id: 0, wordsToGuess: ["bijoux", "savon", "thé"], points: 0 },
      { id: 1, wordsToGuess: ["livre", "peigne", "eau"], points: 0 }
    ]
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: teamDetails
      }
    }

    expect(getTeamsDetailsSelector(state)).toStrictEqual(teamDetails)
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

    expect(getRoundDurationSelector(state)).toBe(90000)
  })
})

describe("getnumberOfTeamsSelector", () => {
  it("should get the value of getRoundNumberSelector", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        numberOfTeams: 2
      }
    }

    expect(getnumberOfTeamsSelector(state)).toBe(2)
  })
})
describe("getWordToGuessSelector", () => {
  it("should get the value of getWordToGuessSelector", () => {
    const teamDetails: TeamsDetailsType = [
      {
        points: 0,
        id: 0,
        wordsToGuess: ["bijoux", "savon", "thé"]
      },
      {
        points: 0,
        id: 1,
        wordsToGuess: ["livre", "peigne", "eau"]
      }
    ]
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        currentIndexTeam: 1,
        teamsDetails: teamDetails
      }
    }

    expect(getWordToGuessSelector(state)).toStrictEqual([
      "livre",
      "peigne",
      "eau"
    ])
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
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          numberOfTeams: 2
        }
      }
    )
    store.dispatch(setNumberOfRound(3))

    expect(store.getState().game.roundNumber).toStrictEqual(6)
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
      { points: 0, id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { points: 0, id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
    ]
    store.dispatch(setTeamDetails(teamDetails))

    expect(store.getState().game.teamsDetails).toStrictEqual(teamDetails)
  })
})
describe("deletingGuessedWord", () => {
  it("should delete the word which have been guessed from the object which have the id 0", () => {
    const teamDetails: TeamsDetailsType = [
      { points: 0, id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { points: 0, id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
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
      { points: 0, id: 0, wordsToGuess: ["savon", "thé"] },
      { points: 0, id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
    ]

    store.dispatch(deleteGuessingWord(wordGuessed))

    expect(store.getState().game.teamsDetails).toStrictEqual(upDateteamDetails)
  })
  it("should delete the word which have been guessed from the array of the key wordsToGuess from the object which have the id 1", () => {
    const teamDetails: TeamsDetailsType = [
      { points: 0, id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { points: 0, id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
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
      { points: 0, id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { points: 0, id: 1, wordsToGuess: ["peigne", "eau"] }
    ]

    store.dispatch(deleteGuessingWord(wordGuessed))

    expect(store.getState().game.teamsDetails).toStrictEqual(upDateteamDetails)
  })
})
describe("passWord", () => {
  it("should set the word which have been passed at the end of the list of wordsToguess key of the object which have the id 0", () => {
    const teamDetails: TeamsDetailsType = [
      { points: 0, id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { points: 0, id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
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
    const wordPassed = "bijoux"
    const upDateteamDetails: TeamsDetailsType = [
      { points: 0, id: 0, wordsToGuess: ["savon", "thé", wordPassed] },
      { points: 0, id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
    ]

    store.dispatch(passWord(wordPassed))

    expect(store.getState().game.teamsDetails).toStrictEqual(upDateteamDetails)
  })
  it("should set the word which have been passed at the end of the list of wordsToguess key of the object which have the id 1", () => {
    const teamDetails: TeamsDetailsType = [
      { points: 0, id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { points: 0, id: 1, wordsToGuess: ["livre", "peigne", "eau"] }
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
    const wordPassed = "livre"
    const upDateteamDetails: TeamsDetailsType = [
      { points: 0, id: 0, wordsToGuess: ["bijoux", "savon", "thé"] },
      { points: 0, id: 1, wordsToGuess: ["peigne", "eau", wordPassed] }
    ]

    store.dispatch(passWord(wordPassed))

    expect(store.getState().game.teamsDetails).toStrictEqual(upDateteamDetails)
  })
})

describe("setNextTeamAsCurrentTeam", () => {
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

describe("checkIfAllWordsHaveBeenGuessed", () => {
  it("should return true as there is no more words to guess", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: [], points: 0 },
          { id: 1, wordsToGuess: [], points: 0 }
        ]
      }
    }

    expect(checkIfAllWordsHaveBeenGuessed(state)).toBe(true)
  })
  it("should return false as there is still words to guess", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: ["hello"], points: 0 },
          { id: 1, wordsToGuess: [], points: 0 }
        ]
      }
    }

    expect(checkIfAllWordsHaveBeenGuessed(state)).toBe(false)
  })
})

describe("getCurrentRoundSelector", () => {
  it("should get the value of getCurrentRoundSelector", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        currentRound: 1
      }
    }

    expect(getCurrentRoundSelector(state)).toBe(1)
  })
})

describe("checkIsAtLeastOneTeamHaveGuessedAllTheirWord", () => {
  it("should return true as at least one team has guessed all word", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: [], points: 0 },
          { id: 1, wordsToGuess: ["hello"], points: 0 }
        ]
      }
    }
    expect(checkIfAtLeastOneTeamHaveBeenGuessedAllTheirWords(state)).toBe(true)
  })
  it("should return false as none of the teams have guessed all word", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: ["coucou"], points: 0 },
          { id: 1, wordsToGuess: ["hello"], points: 0 }
        ]
      }
    }
    expect(checkIfAtLeastOneTeamHaveBeenGuessedAllTheirWords(state)).toBe(false)
  })
})

describe("isGameOverSelector", () => {
  it("should return true as the currentRound is bigger than the numberOfRound AND no every team has guessed all their words", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: [], points: 0 },
          { id: 1, wordsToGuess: ["hello"], points: 0 }
        ],
        currentRound: 5,
        roundNumber: 6
      }
    }
    expect(isGameOverSelector(state)).toBe(false)
  })
  it("should return false as the currentRound is egal than the numberOfRound AND no every team has guessed all their words", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: [], points: 0 },
          { id: 1, wordsToGuess: ["hello"], points: 0 }
        ],
        currentRound: 6,
        roundNumber: 6
      }
    }
    expect(isGameOverSelector(state)).toBe(false)
  })
  it("should return true as the currentRound is egal or lower than the numberOfRound AND there is no more words to guess for any teams", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: [], points: 0 },
          { id: 1, wordsToGuess: [], points: 0 }
        ],
        currentRound: 5,
        roundNumber: 6
      }
    }
    expect(isGameOverSelector(state)).toBe(true)
  })
  it("should return true as the currentRound is bigger than the numberOfRound even if there is still wordsToGuess", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: ["bijoux"], points: 0 },
          { id: 1, wordsToGuess: ["hello"], points: 0 }
        ],
        currentRound: 7,
        roundNumber: 6
      }
    }
    expect(isGameOverSelector(state)).toBe(true)
  })
})

describe("AddOnepoint", () => {
  it("should add one point to the the team 1", () => {
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          currentIndexTeam: 1,
          teamsDetails: [
            { id: 0, wordsToGuess: ["bijoux"], points: 0 },
            { id: 1, wordsToGuess: ["hello"], points: 0 }
          ]
        }
      }
    )
    store.dispatch(addOnePoint())

    expect(store.getState().game.teamsDetails).toStrictEqual([
      { id: 0, wordsToGuess: ["bijoux"], points: 0 },
      { id: 1, wordsToGuess: ["hello"], points: 1 }
    ])
  })
  it("should add one point to the the team 0", () => {
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          currentIndexTeam: 0,
          teamsDetails: [
            { id: 0, wordsToGuess: ["bijoux"], points: 3 },
            { id: 1, wordsToGuess: ["hello"], points: 2 }
          ]
        }
      }
    )
    store.dispatch(addOnePoint())

    expect(store.getState().game.teamsDetails).toStrictEqual([
      { id: 0, wordsToGuess: ["bijoux"], points: 4 },
      { id: 1, wordsToGuess: ["hello"], points: 2 }
    ])
  })
})

describe("getCurrentTeamScore", () => {
  it("should return current  score of team id 0", () => {
    const state = {
      ...initialState,
      game: {
        ...initialState.game,
        currentIndexTeam: 0,
        teamsDetails: [
          { id: 0, wordsToGuess: ["bijoux"], points: 4 },
          { id: 1, wordsToGuess: ["hello"], points: 2 }
        ]
      }
    }

    expect(getCurrentTeamScore(state)).toBe(4)
  })
  it("should return current score of team id 1 ", () => {
    const state = {
      ...initialState,
      game: {
        ...initialState.game,
        currentIndexTeam: 1,
        teamsDetails: [
          { id: 0, wordsToGuess: ["bijoux"], points: 4 },
          { id: 1, wordsToGuess: ["hello"], points: 2 }
        ]
      }
    }

    expect(getCurrentTeamScore(state)).toBe(2)
  })
})
describe("getWinnerTeam", () => {
  it("should return the team which has the biggest points ", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: ["bijoux"], points: 6 },
          { id: 1, wordsToGuess: ["hello"], points: 2 }
        ]
      }
    }

    expect(getWinnersTeams(state)).toStrictEqual([
      {
        id: 0,
        wordsToGuess: ["bijoux"],
        points: 6
      }
    ])
  })
  it("should return all teams which have the biggest points ", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teamsDetails: [
          { id: 0, wordsToGuess: ["bijoux"], points: 6 },
          { id: 1, wordsToGuess: ["hello"], points: 6 }
        ]
      }
    }

    expect(getWinnersTeams(state)).toStrictEqual([
      { id: 0, wordsToGuess: ["bijoux"], points: 6 },
      { id: 1, wordsToGuess: ["hello"], points: 6 }
    ])
  })
})
