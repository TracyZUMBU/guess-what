import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Button } from "../constants/button/Button"
type Props = {
  label: string
  values: any
}

const FormikContainer = ({ label, values }: Props) => {
  type ValuesProps = typeof values
  const initialValues = {}
  const validationSchema = {}
  const onSubmit = (values: ValuesProps) => console.log("Form data", values)
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          <Button type="submit" label={label} />
        </Form>
      )}
    </Formik>
  )
}

export default FormikContainer
