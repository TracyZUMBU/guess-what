import "./button.css"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

interface ButtonProps {
  backgroundColor?: string
  label: string
  type?: "button" | "submit" | "reset" | undefined
  onClick?: () => void
  disabled?: boolean
  option?: boolean
  radius?: string
}

interface LinkbuttonProps extends ButtonProps {
  to: string
}

export const ButtonStyle = styled.button<ButtonProps>`
  font-size: var(--fs-button);
  border-radius: ${({ radius }) => `${radius}`};
  box-shadow: ${({ theme }) => theme.shadow}
  text-align: center;
     padding-block: var(--padding-button);
       width: var(--width-button);
   ${({ option }) =>
     option &&
     css`
       border-radius: unset;
     `};
`

export const StyledLink = styled(Link)<LinkbuttonProps>`  
  display: block ;
  font-size:var(--fs-button);
  border-radius: 25px;
  box-shadow: ${({ theme }) => theme.shadow}
  text-align: center;
  width: var(--width-button);
  padding: var(--padding-button-small);

  `

export const Button = (props: ButtonProps) => {
  return (
    <ButtonStyle radius={"25px"} {...props}>
      {props.label}
    </ButtonStyle>
  )
}
export const RedirectButton = (props: LinkbuttonProps) => {
  return <StyledLink {...props}>{props.label}</StyledLink>
}

export const OptionsButton = (props: ButtonProps) => {
  return (
    <ButtonStyle option {...props}>
      {props.label}
    </ButtonStyle>
  )
}
