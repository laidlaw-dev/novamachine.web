import { type ReactNode } from "react"
import {
  useOnboardingTourStore,
  OnboardingTourContext,
} from "../features/onboarding/hooks/useOnboardingTour"
import { type OnboardingStep } from "../types"

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
