import styled from "styled-components"

interface HeadingProps {
  text: string
  heading?: boolean
  label?: boolean
}

const StyledHeading = styled.h1<HeadingProps>`
  font-size: var(--fs-heading);
  text-align: center;
`
export const Heading = (props: HeadingProps) => {
  return (
    <StyledHeading heading {...props}>
      {props.text}
    </StyledHeading>
  )
}

export const SubTitle = styled.h2`
  font-size: var(--fs-subtitle);
  text-align: center;
`

export const RegularText = styled.p`
  font-size: var(--fs-paragraph);
  text-align: center;
`

type LabelProps = {
  text: string
}
const StyledLabel = styled.label<LabelProps>`
  font-size: var(--fs-label);
  margin-bottom: var(--margin-bottom-label);
  text-align: left;
`

export const Label = (props: LabelProps) => {
  return <StyledLabel {...props}>{props.text}</StyledLabel>
}
