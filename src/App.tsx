import { ThemeProvider } from "@mui/material/styles"
import CutUpPage from "./pages/CutUpPage"
import { theme } from "./theme/theme"
import Onboarding from "./features/onboarding/components/Onboarding"
import { ErrorBoundary } from "react-error-boundary"
import ErrorPage from "./pages/ErrorPage"

function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <ThemeProvider theme={theme}>
        <Onboarding>
          <CutUpPage />
        </Onboarding>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
