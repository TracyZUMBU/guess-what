import styled from "styled-components"

interface Props {
  text: string
}

const StyledHeading = styled.h1<Props>`
  font-size: clamp(3.5rem, 8vw + 1rem, 10.5rem);
`
export const Heading = (props: Props) => {
  return <StyledHeading {...props}>{props.text}</StyledHeading>
}
