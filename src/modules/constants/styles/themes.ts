import { createGlobalStyle } from "styled-components"
import { device } from "./utilis"

type ThemeType = typeof themes

export const LightTheme = {
  pageBackground: `var(--primary-bg-color)`,
  titleColor: `var(--primary-fs-color)`,
  shadow: `6px 6px 16px rgb(163, 177, 198, 0.6),
    -6px -6px 16px rgba(255, 255, 255, 0.5);`,
  tagLineColor: "black"
}

export const DarkTheme = {
  pageBackground: `var(--secondary-bg-color)`,
  titleColor: `var(--secondary-fs-color)`,
  shadow: `6px 6px 16px #121216, -6px -6px 16px #2b2d36;`,
  tagLineColor: "lavender"
}

export const themes = {
  light: LightTheme,
  dark: DarkTheme
}

export const GlobalStyles = createGlobalStyle<{ themes: ThemeType }>`

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit; }
  
  body {
  box-sizing: border-box;
  color: ${({ themes }) => themes.dark.titleColor};
  background-color: ${({ themes }) => themes.dark.pageBackground};
  font-family: 'Poppins', sans-serif !important;
  display: flex;
  flex-flow: column;
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


form { 
  width:100%;
  height:100%;
}

h1, h2,p,button {
  all:unset
  font-family: 'Poppins', sans-serif !important;
}
`
