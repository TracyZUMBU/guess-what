import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setWordsToGuessByTeam } from "../redux/game/infra/gameAction"
import { getWordNumberSelector } from "../redux/game/infra/gameSelector"
import { getWordsSelector } from "../redux/words/infra/wordsSelector"
import { RedirectButton } from "./constants/button/Button"
import { Container } from "./constants/containers/Containers"
import { GAME } from "./path"

export default () => {
  const dispatch = useDispatch()

  const words = useSelector(getWordsSelector)
  const nbrOfWordsToGuessByTeam = useSelector(getWordNumberSelector) as number
  const NUMBER_OF_TEAM = 2
  const nbrOfWordsToGuessInTotal = nbrOfWordsToGuessByTeam * NUMBER_OF_TEAM
  const wordsToGuess = words.slice(0, nbrOfWordsToGuessInTotal)

  const teamWordsToGuess: string[][] = []
  let startWordIndex = 0
  let endWordIndex = nbrOfWordsToGuessByTeam

  for (let i = 0; i < NUMBER_OF_TEAM; i++) {
    teamWordsToGuess.push(wordsToGuess.slice(startWordIndex, endWordIndex))
    startWordIndex += nbrOfWordsToGuessByTeam
    endWordIndex += nbrOfWordsToGuessByTeam
  }

  useEffect(() => {
    dispatch(setWordsToGuessByTeam(teamWordsToGuess))
  }, [])

  return (
    <Container justifyContent="center">
      <RedirectButton label={"C'est parti ! "} to={GAME} />
    </Container>
  )
}
