import { setDurationByRound } from "../redux/game/infra/gameAction"
import { LAUNCH_GAME_PATH } from "./path"
import ChoiceTemplate from "./ui/ChoiceTemplate"

export default () => {
  const durationsInSeconds: number[] = [30, 60, 90]
  return (
    <ChoiceTemplate
      items={durationsInSeconds}
      path={LAUNCH_GAME_PATH}
      subtitle={"Durée d'une manche (en sec)"}
      onClick={setDurationByRound}
    />
  )
}
