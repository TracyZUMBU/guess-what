import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { getAllWords } from "../redux/words/infra/wordAction"
import AddWords from "./AddWords"
import ChooseTypeGameScreen from "./ChooseTypeGameScreen"
import EndOfGame from "./EndOfGame"
import Game from "./Game"
import Home from "./home/HomeScreen"
import LaunchGame from "./LaunchGame"
import Login from "./login/LoginScreen"
import {
  ADD_WORDS_PATH,
  CHOOSE_GAME_PATH,
  END_OF_GAME_PATH,
  GAME,
  LAUNCH_GAME_PATH,
  LOGIN_PATH,
  PICK_DURATION_PATH,
  PICK_NUMBER_PATH,
  PICK_ROUND_PATH
} from "./path"
import PickDuration from "./PickDuration"
import PickNumber from "./PickNumber"
import PickRound from "./PickRound"

export default function Navigation() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllWords())
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home/*" element={<Home />}>
        <Route path="new-user" element={<p>Hey You're new ! Log in</p>} />
      </Route>
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route path={CHOOSE_GAME_PATH} element={<ChooseTypeGameScreen />} />
      <Route path={ADD_WORDS_PATH} element={<AddWords />} />
      <Route path={PICK_NUMBER_PATH} element={<PickNumber />} />
      <Route path={PICK_ROUND_PATH} element={<PickRound />} />
      <Route path={PICK_DURATION_PATH} element={<PickDuration />} />
      <Route path={LAUNCH_GAME_PATH} element={<LaunchGame />} />
      <Route path={GAME} element={<Game />} />
      <Route path={END_OF_GAME_PATH} element={<EndOfGame />} />
    </Routes>
  )
}
