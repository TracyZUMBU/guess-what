import { useDispatch } from "react-redux"
import { OptionsButton, RedirectButton } from "../constants/button/Button"
import { Box, Container } from "../constants/containers/Containers"
import { SubTitle } from "../text/Title"

type Props = {
  items: number[]
  path: string
  subtitle: string
  onClick: (param: number) => void
}

export default ({ subtitle, items, path, onClick }: Props) => {
  const dispatch = useDispatch()
  return (
    <Container>
      <Box height={"100%"} justifyContent="space-between">
        <SubTitle>{subtitle}</SubTitle>
        <Box gap={"30px"}>
          {items.map(item => {
            return (
              <OptionsButton
                key={item}
                label={item.toString()}
                onClick={() => dispatch(onClick(item))}
              />
            )
          })}
        </Box>
        <Box>
          <RedirectButton to={path} label={"Continuer"} />
        </Box>
      </Box>
    </Container>
  )
}
