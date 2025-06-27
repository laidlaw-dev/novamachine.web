import { type ReactNode } from "react"
import {
  useStore,
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
  const store = useStore(steps)

  return (
    <OnboardingTourContext.Provider value={store}>
      {children}
    </OnboardingTourContext.Provider>
  )
}

export default OnboardingTourProvider
