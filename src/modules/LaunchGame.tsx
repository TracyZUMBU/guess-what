import { RedirectButton } from "./constants/button/Button"
import { Container } from "./constants/containers/Containers"
import { GAME } from "./path"

export default () => {
  return (
    <Container justifyContent="center">
      <RedirectButton label={"C'est parti ! "} to={GAME} />
    </Container>
  )
}
