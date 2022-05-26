import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Countdown from "react-countdown"
import { useDispatch, useSelector } from "react-redux"
import { setNextTeamAsCurrentTeam } from "../redux/game/infra/gameAction"
import {
  getCurrentIndexTeamSelector,
  getRoundDurationSelector,
  getTeamsDetailsSelector,
  getWinnersTeams,
  getWordToGuessSelector,
  isGameOverSelector
} from "../redux/game/infra/gameSelector"
import { OptionsButton } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import { RegularText, SubTitle } from "./text/Title"
import PassNCheckButtons from "./ui/PassNCheckButtons"
import ScoreDisplay from "./ui/ScoreDisplay"

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
  const currentTeamIndex = useSelector(getCurrentIndexTeamSelector) as number

  const isNoMoreWordToGuessed = words && words.length === 0

  const [isNextTeamTurn, setIsNextTeamTurn] = useState<boolean>(false)
  const [nextTeam, setNextTeam] = useState(false)

  const [startTime, setStartTime] = useState<number>(Date.now())

  useEffect(() => {
    if (isNoMoreWordToGuessed) {
      setNextTeam(true)
    }
  }, [isNoMoreWordToGuessed])

  function handleNextRound() {
    dispatch(setNextTeamAsCurrentTeam())
    setStartTime(Date.now())
    setNextTeam(false)
  }

  if (nextTeam) {
    //get the next team index in order display it
    return (
      <OptionsButton
        label={`Equipe ${currentTeamIndex + 2} ===`}
        onClick={() => handleNextRound()}
      ></OptionsButton>
    )
  }

  return (
    <>
      {isNextTeamTurn ? (
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
        <ScoreDisplay />
      </Box>
      <PassNCheckButtons word={word} />
    </Container>
  )
}

const NewRound = ({ setIsNextTeamTurn, setStartTime }: NewRoundProps) => {
  const isGameOver = useSelector(isGameOverSelector)
  const currentTeamIndex = useSelector(getCurrentIndexTeamSelector) as number
  const teamsWinners = useSelector(getWinnersTeams)
  const teams = useSelector(getTeamsDetailsSelector)
  const hasMoreThanOneWinner = teamsWinners.length > 1
  const victoryMessage = hasMoreThanOneWinner
    ? "Les équipes vainqueurs sont : "
    : "l'équipe vainqueur est"

  function handleNextRound() {
    setIsNextTeamTurn(false)
    setStartTime(Date.now())
  }

  if (isGameOver) {
    return (
      <Container>
        <Box>
          <SubTitle>{victoryMessage}</SubTitle>
          {teamsWinners.map(team => {
            return (
              <RegularText key={team.id}>{`Equipe ${team.id}`}</RegularText>
            )
          })}
          <RegularText>Résultats</RegularText>
          {teams.map(team => {
            return (
              <Box key={team.id}>
                {" "}
                <RegularText>{`Equipe ${team.id} : ${team.points} points`}</RegularText>
              </Box>
            )
          })}
        </Box>
      </Container>
    )
  }
  return (
    <OptionsButton
      label={`Equipe ${currentTeamIndex + 1}`}
      onClick={() => handleNextRound()}
    ></OptionsButton>
  )
}
