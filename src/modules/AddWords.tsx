import { ErrorMessage, FieldArray, Form, Formik } from "formik"
import { Button } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import Input from "./form/Input"
import Icon from "./ui/Icon"
import * as Yup from "yup"
import TextError from "./form/TextError"
import { useNavigate } from "react-router-dom"

import { addWords } from "../config/firebase"

type ValuesProps = { words: string[] }

export default () => {
  const navigate = useNavigate()
  const initialValues = { words: new Array(5).fill("") }
  const validationSchema = Yup.object().shape({
    words: Yup.array().of(Yup.string())
  })

  const handleSubmit = async (values: ValuesProps) => {
    await addWords()
  }

  return (
    <Container justifyContent={"space-around"}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        render={({ values, errors }) => {
          console.log("errors:", errors)
          return (
            <Form>
              <FieldArray
                name="words"
                render={arrayHelpers => (
                  <Box height="100%" justifyContent="space-around">
                    <Box gap={"15px"}>
                      {values.words && values.words.length > 0 ? (
                        values.words.map((friend, index) => (
                          <Box key={index}>
                            <Input
                              name={`words.${index}`}
                              label={""}
                              placeholder={""}
                              type={"text"}
                            />
                            <ErrorMessage name={"code"} component={TextError} />
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

                    <Box width="100%">
                      <Button type="submit" label={"Enregistrer"} />
                    </Box>
                  </Box>
                )}
              />
            </Form>
          )
        }}
      />
    </Container>
  )
}
