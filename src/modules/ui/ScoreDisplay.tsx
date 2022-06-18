import { useSelector } from "react-redux"
import {
  getCurrentTeamScore,
  getWordNumberSelector
} from "../../redux/game/infra/gameSelector"
import { RegularText } from "../text/title"

export default () => {
  const score = useSelector(getCurrentTeamScore)
  const nbrOfWordsToGuessByTeam = useSelector(getWordNumberSelector) as number
  return <RegularText>{`${score}/ ${nbrOfWordsToGuessByTeam}`}</RegularText>
}
