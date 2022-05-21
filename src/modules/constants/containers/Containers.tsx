import styled from "styled-components"

export interface BoxProps {
  row?: boolean
}

export const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
`
