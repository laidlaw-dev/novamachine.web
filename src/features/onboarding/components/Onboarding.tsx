import { type ReactNode } from "react"
import OnboardingPopup from "./OnboardingPopup"
import OnboardingTourProvider from "../../../providers/OnboardingTourProvider"
import useOnboardingTour from "../hooks/useOnboardingTour"
import type { OnboardingStep } from "../../../types"

interface OnboardingProps {
  steps: OnboardingStep[]
  children: ReactNode | ReactNode[]
}

const Onboarding = ({ steps, children }: OnboardingProps) => {
  return (
    <OnboardingTourProvider steps={steps}>
      {children}
      <PopoverWrapper />
    </OnboardingTourProvider>
  )
}

const PopoverWrapper = () => {
  const { currentStep, nextStep, endTour } = useOnboardingTour()

  return currentStep != null ? (
    <OnboardingPopup
      key={currentStep.stepNumber}
      title={currentStep.title}
      text={currentStep.text}
      stepNumber={currentStep.stepNumber}
      totalSteps={currentStep.totalSteps}
      targetElement={currentStep.targetElement}
      placement={currentStep.placement}
      onNext={nextStep}
      onEnd={endTour}
    />
  ) : null
}

export default Onboarding
