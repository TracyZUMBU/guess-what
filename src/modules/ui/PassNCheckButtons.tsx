import { useDispatch } from "react-redux"
import { deleteGuessingWord, passWord } from "../../redux/game/infra/gameAction"
import { Box } from "../constants/containers/Containers"
import Icon from "./Icon"

type Props = {
  word: string
}

export default ({ word }: Props) => {
  const dispatch = useDispatch()

  function handleGuessing() {
    dispatch(deleteGuessingWord(word))
  }
  function handlePassing() {
    dispatch(passWord(word))
  }
  return (
    <Box row>
      <Icon
        iconName={"close"}
        onClick={() => {
          handlePassing()
        }}
        color={"red"}
      />
      <Icon
        iconName={"checkmark"}
        onClick={() => {
          handleGuessing()
        }}
        color={"green"}
      />
    </Box>
  )
}
