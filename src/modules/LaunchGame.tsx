import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTeamDetails } from "../redux/game/infra/gameAction"
import {
  getnumberOfTeamsSelector,
  getWordNumberSelector
} from "../redux/game/infra/gameSelector"
import { getWordsSelector } from "../redux/words/infra/wordsSelector"
import { TeamsDetailsType } from "../type/game"
import { RedirectButton } from "./constants/button/Button"
import { Container } from "./constants/containers/Containers"
import { GAME } from "./path"

export default () => {
  const dispatch = useDispatch()

  const words = useSelector(getWordsSelector)
  const nbrOfWordsToGuessByTeam = useSelector(getWordNumberSelector) as number
  const numberOfTeams = useSelector(getnumberOfTeamsSelector)
  const nbrOfWordsToGuessInTotal = nbrOfWordsToGuessByTeam * numberOfTeams
  const wordsToGuess = words.slice(0, nbrOfWordsToGuessInTotal)

  const teamWordsToGuess: TeamsDetailsType = []
  let startWordIndex = 0
  let endWordIndex = nbrOfWordsToGuessByTeam

  for (let i = 0; i < numberOfTeams; i++) {
    teamWordsToGuess.push({
      id: i,
      wordsToGuess: wordsToGuess.slice(startWordIndex, endWordIndex),
      points: 0
    })
    startWordIndex += nbrOfWordsToGuessByTeam
    endWordIndex += nbrOfWordsToGuessByTeam
  }
  useEffect(() => {
    dispatch(setTeamDetails(teamWordsToGuess))
  }, [])

  return (
    <Container justifyContent="center">
      <RedirectButton label={"C'est parti ! "} to={GAME} />
    </Container>
  )
}
