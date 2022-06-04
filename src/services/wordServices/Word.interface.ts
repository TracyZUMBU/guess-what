export interface IWordGateway {
  getAllWords(): Promise<string[]>
  addWords(words: string[]): Promise<void>
}
