import React from "react"
import { RedirectButton } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import { HOME_PATH, LAUNCH_GAME_PATH } from "./path"
import { Heading, SubTitle } from "./text/Title"

export default () => {
  return (
    <Container>
      <SubTitle>Fin du jeu</SubTitle>
      <Box gap={"30px"}>
        <Heading text={"Score"} />
        <Heading text={"3/5"} />
      </Box>
      <Box row gap={"20px"}>
        <RedirectButton to={LAUNCH_GAME_PATH} label={"Autre équipe"} />
        <RedirectButton to={HOME_PATH} label={"Quitter"} />
      </Box>
    </Container>
  )
}
