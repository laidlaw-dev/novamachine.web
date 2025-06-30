import { ThemeProvider } from "@mui/material/styles"
import CutUpPage from "./features/cutup/CutUpPage"
import { theme } from "./theme/theme"
import Onboarding from "./features/onboarding/components/Onboarding"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Onboarding>
        <CutUpPage />
      </Onboarding>
    </ThemeProvider>
  )
}

export default App
