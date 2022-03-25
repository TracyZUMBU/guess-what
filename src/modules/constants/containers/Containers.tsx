import styled, { css } from "styled-components"

export interface BoxProps {
  row?: boolean
  gap?: string
  height?: string
  width?: string
  paddingHorizontal?: string
  border?: boolean
  justifyContent?: string
}

export const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  align-items: center;
  gap: ${({ gap }) => gap ?? "unset"};
  width: ${({ width }) => width ?? "100%"};
  /* justify-content: ${({ justifyContent }) => justifyContent ?? ""} */
  ${({ border }) =>
    border &&
    css`
      border-radius: 20px;
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
    ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
    ${({ paddingHorizontal }) =>
    paddingHorizontal &&
    css`
      padding-block: min(${paddingHorizontal});
    `};
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
`
