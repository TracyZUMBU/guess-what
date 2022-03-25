import { Button } from "../constants/button/Button"
import { Box } from "../constants/containers/Containers"
import { Heading } from "../text/title"

const Home = () => {
  return (
    <Box
      height={"100%"}
      width="80%"
      style={{ boxShadow: "6px 6px 16px #121216, -6px -6px 16px #2b2d36" }}
      border
      justifyContent="space-around"
    >
      <Box>
        <Heading text={"Guess What"} />
      </Box>
      <Box gap={"4em"}>
        <Button label={"Ajouter des mots"} />
        <Button label={"Jouer"} />
      </Box>
    </Box>
  )
}
export default Home
