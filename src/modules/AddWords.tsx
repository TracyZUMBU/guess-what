import { FieldArray, Form, Formik } from "formik"
import { Button, RedirectButton } from "./constants/button/Button"
import { Box } from "./constants/containers/Containers"
import Input from "./form/Input"
import Icon from "./ui/Icon"
import * as Yup from "yup"

import { addWords } from "../redux/words/infra/wordAction"
import { useDispatch, useSelector } from "react-redux"
import { getAddWordsStatusSelector } from "../redux/words/infra/wordsSelector"

type ValuesProps = { words: string[] }

export default () => {
  const dispatch = useDispatch()
  const initialValues = { words: new Array(5).fill("") }
  const validationSchema = Yup.object().shape({
    words: Yup.array().of(
      Yup.string().matches(
        /^[a-zA-Z\u00C0-\u00FF]*$/,
        "saisissez uniquement des lettres"
      )
    )
  })
  const { isLoading, error } = useSelector(getAddWordsStatusSelector)

  const handleSubmit = async (values: ValuesProps) => {
    dispatch(addWords(values.words))
  }

  if (isLoading) {
    console.log("isLoading:", isLoading)
    return <div>Loading...</div>
  }
  if (error) {
    console.log("error:", error)
    return <div>Error</div>
  }
  return (
    <Box justifyContent={"space-around"}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        render={({ values }) => {
          return (
            <Form>
              <FieldArray
                name="words"
                render={arrayHelpers => (
                  <Box justifyContent="space-around">
                    <Box gap={"15px"}>
                      {values.words && values.words.length > 0 ? (
                        values.words.map((friend, index) => (
                          <Box key={index}>
                            <Input
                              name={`words.${[index]}`}
                              label={""}
                              placeholder={""}
                              type={"text"}
                            />
                          </Box>
                        ))
                      ) : (
                        <></>
                      )}
                      <Icon
                        iconName="add-circle"
                        color="#2b2d36"
                        onClick={() => arrayHelpers.push("")}
                      />
                    </Box>

                    <Box
                      width="100%"
                      row
                      gap={"4rem"}
                      paddingVertical="4rem"
                      paddingHorizontal="4rem"
                    >
                      <Button type="submit" label={"Enregistrer"} />
                      <RedirectButton to="/home" label={"Quitter"} />
                    </Box>
                  </Box>
                )}
              />
            </Form>
          )
        }}
      />
    </Box>
  )
}
