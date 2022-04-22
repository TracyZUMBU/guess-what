import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getWordsSelector } from "../redux/words/infra/wordsSelector"
import { OptionsButton } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import { END_OF_GAME_PATH } from "./path"
import { RegularText, SubTitle } from "./text/Title"
import Icon from "./ui/Icon"

export default () => {
  const words = useSelector(getWordsSelector)

  return (
    <>
      {words.slice(0, 1).map(word => {
        return <Wordscomponent key={word} word={word} />
      })}
    </>
  )
}

const Wordscomponent = ({ word }: { word: string }) => {
  const navigate = useNavigate()
  const handleRedirections = () => {
    navigate(END_OF_GAME_PATH)
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
          onClick={function (): void {
            console.log("wrong")
          }}
          color={"red"}
        />
        <Icon
          iconName={"checkmark"}
          onClick={handleRedirections}
          color={"green"}
        />
      </Box>
    </Container>
  )
}
