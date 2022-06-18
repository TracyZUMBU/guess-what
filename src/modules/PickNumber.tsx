import { Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { Button } from "./constants/button/Button"
import { Box, Container } from "./constants/containers/Containers"
import Input from "./form/Input"
import * as Yup from "yup"
import { PICK_ROUND_PATH } from "./path"
import { SubTitle } from "./text/title"
import { useDispatch } from "react-redux"
import { setNumberOfWords } from "../redux/game/infra/gameAction"

type ValuesProps = { number: number | null }

export default () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = { number: null }
  const validationSchema = Yup.object().shape({
    number: Yup.number().required("Ce champs est obligatoire").nullable()
  })

  const onSubmit = ({ number }: ValuesProps) => {
    dispatch(setNumberOfWords(number as number))
    navigate(PICK_ROUND_PATH)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {() => {
        return (
          <Container>
            <SubTitle>Nombre de mots</SubTitle>
            <Form>
              <Box height={"100%"} justifyContent="center">
                <Box>
                  <Input
                    type={"number"}
                    placeholder={"15"}
                    label={""}
                    name={"number"}
                  />
                </Box>
                <Box absoluteBottom>
                  <Button type="submit" label={"Valider"} />
                </Box>
              </Box>
            </Form>
          </Container>
        )
      }}
    </Formik>
  )
}
