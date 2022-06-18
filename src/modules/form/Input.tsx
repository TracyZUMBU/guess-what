import { Field, ErrorMessage, FieldAttributes } from "formik"
import styled from "styled-components"
import { Box } from "../constants/containers/Containers"
import { Label } from "../text/title"

import TextError from "./TextError"

type Props = {
  label: string
  name: string
  placeholder: string
  type: string
}

const StyledInput = styled.input<Props>`
  font-size: clamp(1.5rem, 2vw + 1rem, 8.5rem);
  padding: 1.5rem;
  border: none;
  outline: none;
  width: var(--width-input);
  color: inherit;
  border-radius: 25px;
  background-color: inherit;
  box-shadow: inset 6px 6px 16px #121216, inset -6px -6px 16px #2b2d36;
  &::placeholder {
    color: inherit;
  }
`

export default ({ name, type, label }: Props) => {
  return (
    <Box>
      <Field name={name}>
        {(formikField: FieldAttributes<any>) => {
          return (
            <>
              <Label text={label} />
              <StyledInput
                type={type}
                id={name}
                {...formikField.field}
                defaultChecked={formikField.field.value}
              />
              <ErrorMessage name={name} component={TextError} />
            </>
          )
        }}
      </Field>
    </Box>
  )
}
