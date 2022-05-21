import { Dispatch, useState, SetStateAction } from "react"
import Countdown from "react-countdown"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteGuessingWord,
  passWord,
  setNextTeamAsCurrentTeam
} from "../redux/game/infra/gameAction"
import {
  checkIfAllWordsHaveBeenGuessed,
  getRoundDurationSelector,
  getWordToGuessSelector
} from "../redux/game/infra/gameSelector"
import { OptionsButton } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import { RegularText, SubTitle } from "./text/Title"
import Icon from "./ui/Icon"

type WordsProps = {
  word: string
  setIsNextOfRound: Dispatch<SetStateAction<boolean>>
  startTime: number
}
type NextRoundProps = {
  setIsNextOfRound: Dispatch<SetStateAction<boolean>>
  setStartTime: Dispatch<SetStateAction<number>>
}

export default () => {
  const words = useSelector(getWordToGuessSelector)
  const [nextRound, setIsNextOfRound] = useState(false)
  const [startTime, setStartTime] = useState<number>(Date.now())

  return (
    <>
      {words?.length === 0 || nextRound ? (
        <NextRound
          setIsNextOfRound={setIsNextOfRound}
          setStartTime={setStartTime}
        />
      ) : (
        words?.slice(0, 1).map(word => {
          return (
            <Wordscomponent
              key={word}
              word={word}
              setIsNextOfRound={setIsNextOfRound}
              startTime={startTime}
            />
          )
        })
      )}
    </>
  )
}

const Wordscomponent = ({ word, setIsNextOfRound, startTime }: WordsProps) => {
  const dispatch = useDispatch()
  const durationRound = useSelector(getRoundDurationSelector) as number

  function handleGuessing() {
    dispatch(deleteGuessingWord(word))
  }
  function handlePassing() {
    dispatch(passWord(word))
  }

  return (
    <Container>
      <SubTitle>
        {" "}
        <Countdown
          zeroPadTime={2}
          zeroPadDays={0}
          date={startTime + 10000}
          onComplete={() => setIsNextOfRound(true)}
        />
      </SubTitle>
      <Box gap={"30px"}>
        <OptionsButton label={word} />
        <RegularText>0/5</RegularText>
      </Box>

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
    </Container>
  )
}

const NextRound = ({ setIsNextOfRound, setStartTime }: NextRoundProps) => {
  const dispatch = useDispatch()

  function handleNextRound() {
    setIsNextOfRound(false)
    dispatch(setNextTeamAsCurrentTeam())
    setStartTime(Date.now())
  }
  const hasAllWordsGuessed: boolean = useSelector(
    checkIfAllWordsHaveBeenGuessed
  )
  if (hasAllWordsGuessed) {
    return <div>La partie est terminée</div>
  }
  return (
    <OptionsButton
      label={"Equipe suivante"}
      onClick={() => handleNextRound()}
    ></OptionsButton>
  )
}
