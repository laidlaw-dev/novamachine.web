import { ThemeProvider } from "@mui/material/styles"
import CutUpPage from "./features/cutup/CutUpPage"
import { theme } from "./theme/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CutUpPage />
    </ThemeProvider>
  )
}

export default App
