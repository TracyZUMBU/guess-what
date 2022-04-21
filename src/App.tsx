import Navigation from "./modules/Navigation"
import { Box } from "./modules/constants/containers/Containers"
import { ThemeProvider } from "styled-components"
import { useState } from "react"
import { GlobalStyles, themes } from "./modules/constants/styles/themes"
import "./modules/constants/styles/styles.css"
import { Provider } from "react-redux"
import { store } from "./redux/store"

function App() {
  const [theme, setTheme] = useState<string>("dark")
  return (
    //@ts-ignore
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyles themes={themes} />
      <Box
        height="100vh"
        paddingHorizontal={`var(--padding-horizontal-container)`}
      >
        <Provider store={store}>
          <Navigation />
        </Provider>
      </Box>
    </ThemeProvider>
  )
}

export default App
