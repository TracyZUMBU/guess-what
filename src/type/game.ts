export type Teams = Team[]

export type Team = {
  id: number
  wordsToGuess: string[]
  points: number
  round: number
  isPlaying: boolean
}
