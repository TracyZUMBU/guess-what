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
import { Team, Teams } from "./../../type/game"
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
    const teamDetails: Teams = [
      {
        id: 0,
        wordsToGuess: ["bijoux", "savon", "thé"],
        points: 0,
        isPlaying: false,
        round: 0
      },
      {
        id: 1,
        wordsToGuess: ["livre", "peigne", "eau"],
        points: 0,
        isPlaying: false,
        round: 0
      }
    ]
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teams: teamDetails
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
    const teamDetails: Teams = [
      {
        points: 0,
        id: 0,
        wordsToGuess: ["bijoux", "savon", "thé"],
        isPlaying: false,
        round: 0
      },
      {
        points: 0,
        id: 1,
        wordsToGuess: ["livre", "peigne", "eau"],
        isPlaying: true,
        round: 0
      }
    ]
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        currentIndexTeam: 1,
        teams: teamDetails,
        currentTeam: {
          points: 0,
          id: 1,
          wordsToGuess: ["livre", "peigne", "eau"],
          isPlaying: false,
          round: 0
        }
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
    const teamDetails: Teams = [
      {
        points: 0,
        id: 0,
        wordsToGuess: ["bijoux", "savon", "thé"],
        isPlaying: false,
        round: 0
      },
      {
        points: 0,
        id: 1,
        wordsToGuess: ["livre", "peigne", "eau"],
        isPlaying: false,
        round: 0
      }
    ]
    store.dispatch(setTeamDetails(teamDetails))

    expect(store.getState().game.teams).toStrictEqual(teamDetails)
  })
})
describe("deletingGuessedWord", () => {
  it("should delete the word which have been guessed from the object which have the id 0", () => {
    const teamDetails: Teams = [
      {
        points: 0,
        id: 0,
        wordsToGuess: ["bijoux", "savon", "thé"],
        isPlaying: false,
        round: 0
      },
      {
        points: 0,
        id: 1,
        wordsToGuess: ["livre", "peigne", "eau"],
        isPlaying: false,
        round: 0
      }
    ]
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          currentIndexTeam: 0,
          teams: teamDetails
        }
      }
    )
    const wordGuessed = "bijoux"
    const upDateteamDetails: Teams = [
      {
        points: 0,
        id: 0,
        wordsToGuess: ["savon", "thé"],
        isPlaying: false,
        round: 0
      },
      {
        points: 0,
        id: 1,
        wordsToGuess: ["livre", "peigne", "eau"],
        isPlaying: false,
        round: 0
      }
    ]

    store.dispatch(deleteGuessingWord(wordGuessed))

    expect(store.getState().game.teams).toStrictEqual(upDateteamDetails)
  })
  it("should delete the word which have been guessed from the array of the key wordsToGuess from the object which have the id 1", () => {
    const teamDetails: Teams = [
      {
        points: 0,
        id: 0,
        wordsToGuess: ["bijoux", "savon", "thé"],
        round: 0,
        isPlaying: false
      },
      {
        points: 0,
        id: 1,
        wordsToGuess: ["livre", "peigne", "eau"],
        round: 0,
        isPlaying: false
      }
    ]
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          currentIndexTeam: 1,
          teams: teamDetails
        }
      }
    )
    const wordGuessed = "livre"
    const upDateteamDetails: Teams = [
      {
        points: 0,
        id: 0,
        wordsToGuess: ["bijoux", "savon", "thé"],
        round: 0,
        isPlaying: false
      },
      {
        points: 0,
        id: 1,
        wordsToGuess: ["peigne", "eau"],
        round: 0,
        isPlaying: false
      }
    ]

    store.dispatch(deleteGuessingWord(wordGuessed))

    expect(store.getState().game.teams).toStrictEqual(upDateteamDetails)
  })
})
describe("passWord", () => {
  it("should set the word which have been passed at the end of the list of wordsToGuess key of the object currentTeam", () => {
    const currentTeam: Team = {
      points: 0,
      id: 0,
      wordsToGuess: ["bijoux", "savon", "thé"],
      round: 0,
      isPlaying: true
    }

    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          currentTeam
        }
      }
    )
    const wordPassed = "bijoux"
    store.dispatch(passWord(wordPassed))
    expect(store.getState().game.currentTeam).toStrictEqual({
      points: 0,
      id: 0,
      wordsToGuess: ["savon", "thé", "bijoux"],
      round: 0,
      isPlaying: true
    })
  })
})

describe("setNextTeamAsCurrentTeam", () => {
  it("should set the team id 1 as currentTeam", () => {
    const currentTeam = {
      id: 0,
      wordsToGuess: [],
      points: 0,
      isPlaying: true,
      round: 1
    }
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          roundNumber: 3,
          numberOfTeams: 2,
          currentIndexTeam: 0,
          currentTeam: currentTeam,
          teams: [
            {
              id: 1,
              wordsToGuess: ["hello", "world"],
              points: 0,
              isPlaying: false,
              round: 0
            },
            currentTeam
          ]
        }
      }
    )
    store.dispatch(setNextTeamAsCurrentTeam())

    expect(store.getState().game).toStrictEqual({
      ...initialState.game,
      roundNumber: 3,
      numberOfTeams: 2,
      currentIndexTeam: 1,
      teams: [
        {
          id: 1,
          wordsToGuess: ["hello", "world"],
          points: 0,
          isPlaying: true,
          round: 0
        },
        { id: 0, wordsToGuess: [], points: 0, isPlaying: false, round: 2 }
      ],
      currentTeam: {
        id: 1,
        wordsToGuess: ["hello", "world"],
        points: 0,
        isPlaying: true,
        round: 0
      }
    })
  })
  it("should set the team id 2 as currentTeam", () => {
    const currentTeam = {
      id: 0,
      wordsToGuess: [],
      points: 0,
      isPlaying: true,
      round: 2
    }
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          roundNumber: 3,
          numberOfTeams: 4,
          currentIndexTeam: 0,
          currentTeam: currentTeam,
          teams: [
            currentTeam,
            {
              id: 1,
              wordsToGuess: [],
              points: 0,
              isPlaying: false,
              round: 1
            },
            {
              id: 2,
              wordsToGuess: ["hello", "world"],
              points: 0,
              isPlaying: false,
              round: 1
            },
            {
              id: 3,
              wordsToGuess: ["pied", "garage"],
              points: 0,
              isPlaying: false,
              round: 1
            }
          ]
        }
      }
    )
    store.dispatch(setNextTeamAsCurrentTeam())
    expect(store.getState().game).toStrictEqual({
      ...initialState.game,
      roundNumber: 3,
      numberOfTeams: 4,
      currentIndexTeam: 2,
      teams: [
        { id: 0, wordsToGuess: [], points: 0, isPlaying: false, round: 3 },
        {
          id: 1,
          wordsToGuess: [],
          points: 0,
          isPlaying: false,
          round: 1
        },
        {
          id: 2,
          wordsToGuess: ["hello", "world"],
          points: 0,
          isPlaying: true,
          round: 1
        },
        {
          id: 3,
          wordsToGuess: ["pied", "garage"],
          points: 0,
          isPlaying: false,
          round: 1
        }
      ],
      currentTeam: {
        id: 2,
        wordsToGuess: ["hello", "world"],
        points: 0,
        isPlaying: true,
        round: 1
      }
    })
  })
  it("should set the team id 3 as currentTeam", () => {
    const currentTeam = {
      id: 0,
      wordsToGuess: ["hello"],
      points: 0,
      isPlaying: true,
      round: 2
    }
    const store = configureStore(
      {},
      {
        ...initialState,
        game: {
          ...initialState.game,
          roundNumber: 3,
          numberOfTeams: 4,
          currentIndexTeam: 0,
          currentTeam: currentTeam,
          teams: [
            currentTeam,
            {
              id: 1,
              wordsToGuess: [],
              points: 0,
              isPlaying: false,
              round: 2
            },
            {
              id: 2,
              wordsToGuess: [],
              points: 0,
              isPlaying: false,
              round: 2
            },
            {
              id: 3,
              wordsToGuess: ["pied", "garage"],
              points: 0,
              isPlaying: false,
              round: 2
            }
          ]
        }
      }
    )
    store.dispatch(setNextTeamAsCurrentTeam())
    expect(store.getState().game).toStrictEqual({
      ...initialState.game,
      roundNumber: 3,
      numberOfTeams: 4,
      currentIndexTeam: 3,
      teams: [
        {
          id: 0,
          wordsToGuess: ["hello"],
          points: 0,
          isPlaying: false,
          round: 3
        },
        {
          id: 1,
          wordsToGuess: [],
          points: 0,
          isPlaying: false,
          round: 2
        },
        {
          id: 2,
          wordsToGuess: [],
          points: 0,
          isPlaying: false,
          round: 2
        },
        {
          id: 3,
          wordsToGuess: ["pied", "garage"],
          points: 0,
          isPlaying: true,
          round: 2
        }
      ],
      currentTeam: {
        id: 3,
        wordsToGuess: ["pied", "garage"],
        points: 0,
        isPlaying: true,
        round: 2
      }
    })
  })
})

describe("checkIfAllWordsHaveBeenGuessed", () => {
  it("should return true as there is no more words to guess", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teams: [
          { id: 0, wordsToGuess: [], points: 0, isPlaying: false, round: 0 },
          { id: 1, wordsToGuess: [], points: 0, isPlaying: false, round: 0 }
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
        teams: [
          {
            id: 0,
            wordsToGuess: ["hello"],
            points: 0,
            isPlaying: false,
            round: 0
          },
          { id: 1, wordsToGuess: [], points: 0, isPlaying: false, round: 0 }
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
        teams: [
          { id: 0, wordsToGuess: [], points: 0, isPlaying: false, round: 0 },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 0,
            isPlaying: false,
            round: 0
          }
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
        teams: [
          {
            id: 0,
            wordsToGuess: ["coucou"],
            points: 0,
            isPlaying: false,
            round: 0
          },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 0,
            isPlaying: false,
            round: 0
          }
        ]
      }
    }
    expect(checkIfAtLeastOneTeamHaveBeenGuessedAllTheirWords(state)).toBe(false)
  })
})

describe("isGameOverSelector", () => {
  it("should return true as all team achieved all the rounds", () => {
    const state: AppState = {
      ...initialState,

      game: {
        ...initialState.game,
        roundNumber: 3,
        teams: [
          { id: 0, wordsToGuess: [], points: 0, isPlaying: false, round: 3 },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 0,
            isPlaying: false,
            round: 3
          }
        ]
      }
    }
    expect(isGameOverSelector(state)).toBe(true)
  })
  it("should return false one of the teams have not achieved all the round", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teams: [
          { id: 0, wordsToGuess: [], points: 0, isPlaying: false, round: 3 },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 0,
            isPlaying: false,
            round: 2
          }
        ],

        roundNumber: 3
      }
    }
    expect(isGameOverSelector(state)).toBe(false)
  })
  it("should return true all the teams have guess all the words", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teams: [
          { id: 0, wordsToGuess: [], points: 0, isPlaying: false, round: 0 },
          { id: 1, wordsToGuess: [], points: 0, isPlaying: false, round: 0 }
        ],

        roundNumber: 3
      }
    }
    expect(isGameOverSelector(state)).toBe(true)
  })
  it("should return false as at least one team have still guess words and none of them have completed all the rounds", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teams: [
          {
            id: 0,
            wordsToGuess: ["bijoux"],
            points: 0,
            isPlaying: false,
            round: 1
          },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 0,
            isPlaying: false,
            round: 1
          }
        ],

        roundNumber: 2
      }
    }
    expect(isGameOverSelector(state)).toBe(false)
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
          teams: [
            {
              id: 0,
              wordsToGuess: ["bijoux"],
              points: 0,
              isPlaying: false,
              round: 0
            },
            {
              id: 1,
              wordsToGuess: ["hello"],
              points: 0,
              isPlaying: false,
              round: 0
            }
          ]
        }
      }
    )
    store.dispatch(addOnePoint())

    expect(store.getState().game.teams).toStrictEqual([
      {
        id: 0,
        wordsToGuess: ["bijoux"],
        points: 0,
        isPlaying: false,
        round: 0
      },
      { id: 1, wordsToGuess: ["hello"], points: 1, isPlaying: false, round: 0 }
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
          teams: [
            {
              id: 0,
              wordsToGuess: ["bijoux"],
              points: 3,
              isPlaying: false,
              round: 0
            },
            {
              id: 1,
              wordsToGuess: ["hello"],
              points: 2,
              isPlaying: false,
              round: 0
            }
          ]
        }
      }
    )
    store.dispatch(addOnePoint())

    expect(store.getState().game.teams).toStrictEqual([
      {
        id: 0,
        wordsToGuess: ["bijoux"],
        points: 4,
        isPlaying: false,
        round: 0
      },
      { id: 1, wordsToGuess: ["hello"], points: 2, isPlaying: false, round: 0 }
    ])
  })
})

describe("getCurrentTeamScore", () => {
  it("should return current  score of team id 0", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        currentIndexTeam: 0,
        teams: [
          {
            id: 0,
            wordsToGuess: ["bijoux"],
            points: 4,
            round: 0,
            isPlaying: false
          },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 2,
            round: 0,
            isPlaying: false
          }
        ]
      }
    }

    expect(getCurrentTeamScore(state)).toBe(4)
  })
  it("should return current score of team id 1 ", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        currentIndexTeam: 1,
        teams: [
          {
            id: 0,
            wordsToGuess: ["bijoux"],
            points: 4,
            round: 0,
            isPlaying: false
          },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 2,
            round: 0,
            isPlaying: false
          }
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
        teams: [
          {
            id: 0,
            wordsToGuess: ["bijoux"],
            points: 6,
            isPlaying: false,
            round: 0
          },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 2,
            isPlaying: false,
            round: 0
          }
        ]
      }
    }

    expect(getWinnersTeams(state)).toStrictEqual([
      {
        id: 0,
        wordsToGuess: ["bijoux"],
        points: 6,
        isPlaying: false,
        round: 0
      }
    ])
  })
  it("should return all teams which have the biggest points ", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teams: [
          {
            id: 0,
            wordsToGuess: ["bijoux"],
            points: 6,
            isPlaying: false,
            round: 0
          },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 6,
            isPlaying: false,
            round: 0
          }
        ]
      }
    }

    expect(getWinnersTeams(state)).toStrictEqual([
      {
        id: 0,
        wordsToGuess: ["bijoux"],
        points: 6,
        isPlaying: false,
        round: 0
      },
      { id: 1, wordsToGuess: ["hello"], points: 6, isPlaying: false, round: 0 }
    ])
  })
  it("should return an empty array as no teams have guessed any words ", () => {
    const state: AppState = {
      ...initialState,
      game: {
        ...initialState.game,
        teams: [
          {
            id: 0,
            wordsToGuess: ["bijoux"],
            points: 0,
            isPlaying: false,
            round: 0
          },
          {
            id: 1,
            wordsToGuess: ["hello"],
            points: 0,
            isPlaying: false,
            round: 0
          }
        ]
      }
    }

    expect(getWinnersTeams(state)).toStrictEqual([])
  })
})
