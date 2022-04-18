import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getWords } from "../config/firebase"
import { OptionsButton } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import { END_OF_GAME_PATH } from "./path"
import { RegularText, SubTitle } from "./text/Title"
import Icon from "./ui/Icon"

export default () => {
  const navigate = useNavigate()
  const [words, setWords] = useState<string[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWords()
      const words = data[0]
      setWords([words])
    }
    fetchData()
  }, [])

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
