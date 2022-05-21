import { createGlobalStyle } from "styled-components"
import { device } from "./utilis"

type ThemeType = typeof themes

export const LightTheme = {
  pageBackground: `var(--primary-bg-color)`,
  titleColor: `var(--primary-fs-color)`,
  tagLineColor: "black"
}

export const DarkTheme = {
  pageBackground: "#282c36",
  titleColor: "lightpink",
  tagLineColor: "lavender"
}

export const themes = {
  light: LightTheme,
  dark: DarkTheme
}

export const GlobalStyles = createGlobalStyle<{ themes: ThemeType }>`
body {
  background-color: ${({ themes }) => themes.light.pageBackground}
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit; }

body {
  box-sizing: border-box;
  @media ${device.mobileS}{
    background-color:yellow
  } 

  @media ${device.laptop}{
    background-color:var(--primary-bg-color)
  }
}

html { 
  @media ${device.mobileS}{
    font-size:50%
  }
  @media ${device.tablet}{
    font-size:56.25%
  }
  @media ${device.laptop}{
    font-size:62.5%;
  }
}
`
