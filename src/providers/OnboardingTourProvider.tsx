import { type ReactNode } from "react"
import {
  useOnboardingTourStore,
  OnboardingTourContext,
  type OnboardingStep,
} from "../features/onboarding/hooks/useOnboardingTour"

const OnboardingTourProvider = ({
  steps,
  children,
}: {
  steps: OnboardingStep[]
  children: ReactNode
}) => {
  const store = useOnboardingTourStore(steps)

  return (
    <OnboardingTourContext.Provider value={store}>
      {children}
    </OnboardingTourContext.Provider>
  )
}

export default OnboardingTourProvider
