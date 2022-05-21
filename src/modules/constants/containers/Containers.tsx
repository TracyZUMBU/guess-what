import styled, { css } from "styled-components"

export interface BoxProps {
  alignSelf?: string
  row?: boolean
  gap?: string
  height?: string
  width?: string
  paddingHorizontal?: string
  border?: boolean
  justifyContent?: string
  backgroundColor?: string
  absoluteBottom?: boolean
}

export const Container = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  width: 90%;
  border-radius: 20px;
  /* min-height: 100vh; */
  height: ${({ height }) => height ?? "100vh"};
  box-shadow: ${({ theme }) => theme.shadow};
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent ?? "space-between"};
  padding-right: var(--padding-vertical-container);
  padding-left: var(--padding-vertical-container);
  padding-block: var(--padding-horizontal-container);
`

export const Box = styled.div<BoxProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: relative;
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  align-items: center;
  gap: ${({ gap }) => gap ?? "unset"};
  width: ${({ width }) => width ?? "100%"};
  align-self: ${({ alignSelf }) => alignSelf ?? "unset"};
  justify-content: ${({ justifyContent }) => justifyContent ?? "unset"};
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
  ${({ absoluteBottom }) =>
    absoluteBottom &&
    css`
      position: absolute;
      bottom: 0;
      margin-bottom: min(5vh, 5rem);
    `}
`
