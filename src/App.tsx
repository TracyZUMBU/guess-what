import Navigation from "./modules/Navigation"
import { Box } from "./modules/constants/containers/Containers"
import { ThemeProvider } from "styled-components"
import { useState } from "react"
import { GlobalStyles, themes } from "./modules/constants/styles/themes"
import "./modules/constants/styles/styles.css"

function App() {
  const [theme, setTheme] = useState<string>("dark")
  return (
    //@ts-ignore
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyles themes={themes} />
      <Box>
        <Navigation />
      </Box>
    </ThemeProvider>
  )
}

export default App
