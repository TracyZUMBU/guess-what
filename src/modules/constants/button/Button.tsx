import "./button.css"
import styled, { css } from "styled-components"

interface ButtonProps {
  primary?: boolean
  backgroundColor?: string
  size?: "small" | "medium" | "large"
  label: string
  type?: "button" | "submit" | "reset" | undefined
  onClick?: () => void
  small?: boolean
  large?: boolean
  disabled?: boolean
}

export const ButtonStyle = styled.button<ButtonProps>`
  color: white;
  font-size: 16px;
  padding: 5px 7px;
  border: 1px solid black;
  border-radius: 25px;
  min-width: 5rem;
  ${({ primary }) =>
    primary &&
    css`
      background-color: var(--primary-bg-color);
      border: 1px dotted yellow;
    `};
  ${({ small }) =>
    small &&
    css`
      font-size: 12px;
      padding: 10px 16px;
    `};
  ${({ large }) =>
    large &&
    css`
      font-size: 18px;
      padding: 10px 16px;
    `};
`

export const Button = (props: ButtonProps) => {
  return <ButtonStyle {...props}>{props.label}</ButtonStyle>
}
