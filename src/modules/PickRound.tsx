import { useSelector } from "react-redux"
import { setNumberOfRound } from "../redux/game/infra/gameAction"
import { getWordNumberSelector } from "../redux/game/infra/gameSelector"
import { getWordsSelector } from "../redux/words/infra/wordsSelector"
import { PICK_DURATION_PATH } from "./path"
import ChoiceTemplate from "./ui/ChoiceTemplate"

export default () => {
  const durations = [3, 4, 5]
  return (
    <ChoiceTemplate
      items={durations}
      path={PICK_DURATION_PATH}
      subtitle={"Nombre de manche"}
      onClick={setNumberOfRound}
    />
  )
}
