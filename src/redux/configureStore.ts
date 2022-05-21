import { gameReducer } from "./game/infra/gameReducer"
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore
} from "redux"
import thunk, { ThunkAction, ThunkMiddleware } from "redux-thunk"
import { AppState } from "./AppState.interface"
import { Dependencies } from "./index"
import { wordReducer } from "./words/infra/wordsReducer"
import { composeWithDevTools } from "redux-devtools-extension"

export type ThunkResult<R> = ThunkAction<R, AppState, Dependencies, AnyAction>

export const rootReducer = combineReducers<AppState>({
  words: wordReducer,
  game: gameReducer
})

export const configureStore = (
  dependencies: Partial<Dependencies>,
  preloadedState?: AppState
) =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        dependencies
          ? (thunk.withExtraArgument(dependencies) as ThunkMiddleware<
              AppState,
              AnyAction,
              Dependencies
            >)
          : thunk
      )
    )
  )
