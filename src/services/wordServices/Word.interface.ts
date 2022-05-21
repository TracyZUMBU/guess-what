export interface IWordGateway {
  getAllWords(): Promise<string[]>
}
