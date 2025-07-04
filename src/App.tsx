import { ThemeProvider } from "@mui/material/styles"
import CutUpPage from "./pages/CutUpPage"
import { theme } from "./theme/theme"
import Onboarding from "./features/onboarding/components/Onboarding"
import { ErrorBoundary } from "react-error-boundary"
import ErrorPage from "./pages/ErrorPage"
import onboardingSteps from "./onboardingSteps"
import { useTranslation } from "react-i18next"

function App() {
  const { t } = useTranslation()

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <ThemeProvider theme={theme}>
        <Onboarding steps={onboardingSteps(t)}>
          <CutUpPage />
        </Onboarding>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
