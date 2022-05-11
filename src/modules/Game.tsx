import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteGuessingWord } from "../redux/game/infra/gameAction"
import {
  getCurrentTeam,
  getWordsToGuessByTeam
} from "../redux/game/infra/gameSelector"
import { getWordsSelector } from "../redux/words/infra/wordsSelector"
import { OptionsButton } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import { END_OF_GAME_PATH } from "./path"
import { RegularText, SubTitle } from "./text/Title"
import Icon from "./ui/Icon"

export default () => {
  const wordsToGuessByTeam = useSelector(getWordsToGuessByTeam)
  const currentTeam = useSelector(getCurrentTeam)
  const wordsToGuess = wordsToGuessByTeam[currentTeam]

  return (
    <>
      {wordsToGuess.slice(0, 1).map(word => {
        return <Wordscomponent key={word} word={word} />
      })}
    </>
  )
}

const Wordscomponent = ({ word }: { word: string }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleRedirection = () => {
    navigate(END_OF_GAME_PATH)
  }
  const wordsToGuessByTeam = useSelector(getWordsToGuessByTeam)
  const updateWordsToGuessByTeam = wordsToGuessByTeam.map(words => {
    if (words.includes(word)) {
      return words.filter(el => el !== word)
    } else return words
  })

  return (
    <Container>
      <SubTitle>Compteur</SubTitle>
      <Box gap={"30px"}>
        <OptionsButton label={word} />
        <RegularText>0/5</RegularText>
      </Box>
      <Box row>
        <Icon
          iconName={"close"}
          onClick={function (): void {
            console.log("wrong")
          }}
          color={"red"}
        />
        <Icon
          iconName={"checkmark"}
          onClick={() => dispatch(deleteGuessingWord(updateWordsToGuessByTeam))}
          color={"green"}
        />
      </Box>
    </Container>
  )
}
