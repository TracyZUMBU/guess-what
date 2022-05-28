import { Team } from "./../../../type/game"
import { Game } from "../../AppState.interface"

type Action = {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}

const initialState: Game = {
  wordNumber: 0,
  roundNumber: 0,
  roundDuration: 0,
  teams: [],
  currentIndexTeam: 0,
  numberOfTeams: 2,
  currentRound: 0,
  currentTeam: null
}

export const gameReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_NUM_OF_WORDS": {
      return { ...state, wordNumber: action.payload }
    }
    case "SET_NUM_OF_ROUND": {
      return { ...state, roundNumber: action.payload * state.numberOfTeams }
    }
    case "SET_DURATION_BY_ROUND": {
      return { ...state, roundDuration: action.payload }
    }
    case "SET_TEAMS": {
      return {
        ...state,
        teams: action.payload,
        currentTeam: action.payload[0]
      }
    }
    case "DELETE_GUESSING_WORD": {
      return {
        ...state,
        currentTeam: {
          ...state.currentTeam,
          wordsToGuess: state.currentTeam?.wordsToGuess.filter(
            word => word !== action.payload
          )
        },
        teams: state.teams.map(team => {
          if (team.id === state.currentIndexTeam) {
            return {
              ...team,
              wordsToGuess: team.wordsToGuess.filter(
                word => word !== action.payload
              )
            }
          } else if (team.id !== state.currentIndexTeam) {
            return {
              ...team
            }
          }
        })
      }
    }
    case "SET_NEXT_TEAM_AS_CURRENT_TEAM": {
      const teamsStillPlaying = state.teams
        .filter(team => team.isPlaying === false)
        .filter(team => team.wordsToGuess.length > 0)
        .filter(team => team.round < state.roundNumber)

      const potentialNextTeam = teamsStillPlaying.find(
        team => team.id > (state.currentTeam as Team).id
      )

      const team = teamsStillPlaying.length
        ? { ...potentialNextTeam, isPlaying: true }
        : state.currentTeam

      const indexTeam = (
        teamsStillPlaying.length ? potentialNextTeam?.id : state.currentTeam?.id
      ) as number

      return {
        ...state,
        currentTeam: team,
        currentIndexTeam: indexTeam,
        teams: state.teams.map(team => {
          if (team.id === indexTeam) {
            return {
              ...team,
              isPlaying: true
            }
          } else if (team.id !== indexTeam) {
            return {
              ...team,
              isPlaying: false
            }
          }
        })
      }
    }
    case "PASS_WORD":
      return {
        ...state,
        teams: state.teams.map(team => {
          if (team.id === state.currentIndexTeam) {
            const wordsToGuess = [...team.wordsToGuess]
            const wordsUpdated = wordsToGuess.filter(
              word => word !== action.payload
            )
            wordsUpdated.push(action.payload)
            return {
              ...team,
              wordsToGuess: wordsUpdated
            }
          } else if (team.id !== state.currentIndexTeam) {
            return {
              ...team
            }
          }
        })
      }
    case "ADD_ONE_POINT": {
      return {
        ...state,
        teams: state.teams.map(team => {
          if (team.id === state.currentIndexTeam) {
            return { ...team, points: ++team.points }
          } else {
            return { ...team }
          }
        })
      }
    }

    default:
      return state
  }
}
