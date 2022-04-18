import { PICK_DURATION_PATH } from "./path"
import ChoiceTemplate from "./ui/ChoiceTemplate"

export default () => {
  const numberWords = ["5", "7", "9"]
  return (
    <ChoiceTemplate
      items={numberWords}
      path={PICK_DURATION_PATH}
      subtitle={"Combien de mots à deviner ?"}
    />
  )
}
