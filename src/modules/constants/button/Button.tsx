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
  font-size: 16px;
  border-radius: 25px;
  box-shadow: ${({ theme }) => theme.shadow}
  text-align: center;
  width:60% ;
  padding: 1.5rem;

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
