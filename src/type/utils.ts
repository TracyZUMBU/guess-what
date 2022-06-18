import { FormikState } from "formik"

export type Some<T> = T
export type None = undefined | null
export type Maybe<T> = Some<T> | None
export type Option<T> = Some<T> | null
export type Status = "idle" | "loading" | "success" | "error"
export type Error = Option<string>
export type ResetForm = (
  nextState?:
    | Partial<
        FormikState<{
          words: any[]
        }>
      >
    | undefined
) => void
