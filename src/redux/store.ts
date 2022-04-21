import { IWordGateway } from "./../services/wordServices/Word.interface"
import thunk, { ThunkAction, ThunkMiddleware } from "redux-thunk"
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore
} from "redux"
import { wordReducer } from "./words/wordsReducer"
import { AppState } from "./AppState.interface"
import { WordsGateway } from "../services/wordServices/FirebaseGateway"

export type ThunkResult<R> = ThunkAction<R, AppState, Dependencies, AnyAction>

export interface Dependencies {
  wordsGateway: IWordGateway
}
export const wordsGateway = new WordsGateway()
const dependencies: Dependencies = {
  wordsGateway
}

export const rootReducer = combineReducers<AppState>({
  words: wordReducer
})

const configureStore = (
  dependencies: Partial<Dependencies>,
  preloadedState?: AppState
) =>
  createStore(
    rootReducer,
    preloadedState,
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

export const store = configureStore(dependencies)
