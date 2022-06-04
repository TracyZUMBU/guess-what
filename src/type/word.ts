import { Option } from "./utils"
export type Words = {
  words: string[]
  isWordsAdded: { status: boolean; isLoading: boolean; error: Option<string> }
}
