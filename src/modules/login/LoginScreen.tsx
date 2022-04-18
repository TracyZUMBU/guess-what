import { Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Button } from "../constants/button/Button"
import { Box, Container } from "../constants/containers/Containers"
import Input from "../form/Input"
import { ADD_WORDS_PATH } from "../path"

type ValuesProps = { code: string }

const Login = () => {
  const navigate = useNavigate()
  const initialValues = { code: "" }
  const validationSchema = Yup.object().shape({
    code: Yup.number().required("Ce champs est obligatoire")
  })
  const onSubmit = (values: ValuesProps) => {
    navigate(ADD_WORDS_PATH)
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
            <Form>
              <Box height={"100%"} justifyContent="center">
                <Box>
                  <Input
                    type={"number"}
                    placeholder={"0258 "}
                    label={"Saisissez le code d'accès"}
                    name={"code"}
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

export default Login
