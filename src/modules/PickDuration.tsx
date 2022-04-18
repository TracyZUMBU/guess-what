import { LAUNCH_GAME_PATH } from "./path"
import ChoiceTemplate from "./ui/ChoiceTemplate"

export default () => {
  const durations = ["30 sec", "60 sec", "90 sec"]
  return (
    <ChoiceTemplate
      items={durations}
      path={LAUNCH_GAME_PATH}
      subtitle={"Durée de la manche"}
    />
  )
}
