import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Countdown from "react-countdown"
import { useDispatch, useSelector } from "react-redux"
import { setNextTeamAsCurrentTeam } from "../redux/game/infra/gameAction"
import {
  getCurrentIndexTeamSelector,
  getRoundDurationSelector,
  getWordToGuessSelector,
  isGameOverSelector
} from "../redux/game/infra/gameSelector"
import { OptionsButton } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import { RegularText, SubTitle } from "./text/Title"
import PassNCheckButtons from "./ui/PassNCheckButtons"

type WordsProps = {
  word: string
  setIsNextTeamTurn: Dispatch<SetStateAction<boolean>>
  startTime: number
}
type NewRoundProps = {
  setIsNextTeamTurn: Dispatch<SetStateAction<boolean>>
  setStartTime: Dispatch<SetStateAction<number>>
}

export default () => {
  const dispatch = useDispatch()
  const words = useSelector(getWordToGuessSelector)
  const isNoMoreWordToGuessed = words && words.length === 0
  const [isNextTeamTurn, setIsNextTeamTurn] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<number>(Date.now())

  useEffect(() => {
    isNoMoreWordToGuessed && dispatch(setNextTeamAsCurrentTeam())
  }, [words])

  return (
    <>
      {isNoMoreWordToGuessed || isNextTeamTurn ? (
        <NewRound
          setIsNextTeamTurn={setIsNextTeamTurn}
          setStartTime={setStartTime}
        />
      ) : (
        words?.slice(0, 1).map(word => {
          return (
            <Wordscomponent
              key={word}
              word={word}
              setIsNextTeamTurn={setIsNextTeamTurn}
              startTime={startTime}
            />
          )
        })
      )}
    </>
  )
}

const Wordscomponent = ({ word, setIsNextTeamTurn, startTime }: WordsProps) => {
  const dispatch = useDispatch()
  const durationRound = useSelector(getRoundDurationSelector) as number

  return (
    <Container>
      <SubTitle>
        {" "}
        <Countdown
          zeroPadTime={2}
          zeroPadDays={0}
          date={startTime + 5000}
          onComplete={() => {
            dispatch(setNextTeamAsCurrentTeam())
            setIsNextTeamTurn(true)
          }}
        />
      </SubTitle>
      <Box gap={"30px"}>
        <OptionsButton label={word} />
        <RegularText>0/5</RegularText>
      </Box>
      <PassNCheckButtons word={word} />
    </Container>
  )
}

const NewRound = ({ setIsNextTeamTurn, setStartTime }: NewRoundProps) => {
  const isGameOver = useSelector(isGameOverSelector)
  const currentTeamIndex = useSelector(getCurrentIndexTeamSelector) as number

  function handleNextRound() {
    setIsNextTeamTurn(false)
    setStartTime(Date.now())
  }

  if (isGameOver) {
    return <div>La partie est terminée</div>
  }
  return (
    <OptionsButton
      label={`Equipe ${currentTeamIndex + 1}`}
      onClick={() => handleNextRound()}
    ></OptionsButton>
  )
}
