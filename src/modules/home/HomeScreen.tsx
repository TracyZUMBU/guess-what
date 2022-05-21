import { RedirectButton } from "../constants/button/Button"
import { Box, Container } from "../constants/containers/Containers"
import { Heading } from "../text/Title"

const Home = () => {
  return (
    <Container justifyContent="space-between">
      <Box>
        <Heading text={"Guess What"} />
      </Box>
      <Box gap={"20px"}>
        <RedirectButton to="/login" label={"Ajouter des mots"} />
        <RedirectButton to="/pickNumber" label={"Jouer"} />
      </Box>
    </Container>
  )
}
export default Home
