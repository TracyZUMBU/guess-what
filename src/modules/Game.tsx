import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  deleteGuessingWord,
  passWord,
  setNextTeamAsCurrentTeam
} from "../redux/game/infra/gameAction"
import { getWordToGuessSelector } from "../redux/game/infra/gameSelector"
import { OptionsButton } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import { GAME } from "./path"
import { RegularText, SubTitle } from "./text/Title"
import Icon from "./ui/Icon"

export default () => {
  const words = useSelector(getWordToGuessSelector)

  return (
    <>
      {words?.length === 0 ? (
        <EndOfRound />
      ) : (
        words?.slice(0, 1).map(word => {
          return <Wordscomponent key={word} word={word} />
        })
      )}
    </>
  )
}

const Wordscomponent = ({ word }: { word: string }) => {
  const dispatch = useDispatch()
  function handleGuessing() {
    dispatch(deleteGuessingWord(word))
  }
  function handlePassing() {
    dispatch(passWord(word))
  }
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
          onClick={() => {
            handlePassing()
          }}
          color={"red"}
        />
        <Icon
          iconName={"checkmark"}
          onClick={() => {
            handleGuessing()
          }}
          color={"green"}
        />
      </Box>
    </Container>
  )
}

const EndOfRound = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function handleClick() {
    dispatch(setNextTeamAsCurrentTeam())
    navigate(GAME, { replace: true })
  }
  return (
    <OptionsButton
      label={"Equipe suivante"}
      onClick={() => handleClick()}
    ></OptionsButton>
  )
}
