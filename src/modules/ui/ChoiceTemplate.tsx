import { OptionsButton, RedirectButton } from "../constants/button/Button"
import { Box, Container } from "../constants/containers/Containers"
import { SubTitle } from "../text/Title"

type Props = {
  items: string[]
  path: string
  subtitle: string
}

export default ({ subtitle, items, path }: Props) => {
  const b = () =>
    setTimeout(() => {
      console.log("b")
    })
  return (
    <Container>
      <Box height={"100%"} justifyContent="space-between">
        <SubTitle>{subtitle}</SubTitle>
        <Box gap={"30px"}>
          {items.map(item => {
            return <OptionsButton key={item} label={item} />
          })}
        </Box>
        <Box>
          <RedirectButton to={path} label={"Continuer"} />
        </Box>
      </Box>
    </Container>
  )
}
