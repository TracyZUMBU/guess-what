// import { storage } from "redux-persist/lib/storage"
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

// const persistConfig = {
//   key: "root",
//   storage: storage
// }

// const persistConfig: PersistConfigType = {
//   key: "root",
//   storage: storage,
//   blacklist: ["moderation"]
//   // blacklist: ["monitoring"],
//   // stateReconciler: autoMergeLevel1
// }

// export const persistedReducer = persistReducer(persistConfig, rootReducer)

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
