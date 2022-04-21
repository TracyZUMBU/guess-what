import { LAUNCH_GAME_PATH } from "./path"
import ChoiceTemplate from "./ui/ChoiceTemplate"

export default () => {
  const durations = [30, 60, 90]
  return (
    <ChoiceTemplate
      items={durations}
      path={LAUNCH_GAME_PATH}
      subtitle={"Durée d'une manche (en sec)"}
      onClick={() => {}}
    />
  )
}
