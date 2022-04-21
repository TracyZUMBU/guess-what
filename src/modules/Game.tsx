import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllWords } from "../redux/words/wordAction"
import { getWordsSelector } from "../redux/words/wordsSelector"
import { OptionsButton } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import { END_OF_GAME_PATH } from "./path"
import { RegularText, SubTitle } from "./text/Title"
import Icon from "./ui/Icon"

export default () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllWords())
  }, [])

  const words = useSelector(getWordsSelector)

  const handleRedirections = () => {
    navigate(END_OF_GAME_PATH)
  }
  return (
    <Container>
      <SubTitle>Compteur</SubTitle>
      <Box gap={"30px"}>
        <OptionsButton label={"Bonjour"} />
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
