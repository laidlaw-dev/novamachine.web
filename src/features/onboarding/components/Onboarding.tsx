import { type ReactNode } from "react"
import OnboardingPopover from "./OnboardingPopover"
import OnboardingTourProvider from "../../../providers/OnboardingTourProvider"
import useOnboardingTour from "../hooks/useOnboardingTour"
import { useTranslation } from "react-i18next"
import onboardingSteps from "../../../onboardingSteps"

interface OnboardingProps {
  children: ReactNode | ReactNode[]
}

const Onboarding = ({ children }: OnboardingProps) => {
  const { t } = useTranslation()

  return (
    <OnboardingTourProvider steps={onboardingSteps(t)}>
      {children}
      <PopoverWrapper />
    </OnboardingTourProvider>
  )
}

const PopoverWrapper = () => {
  const { currentStep, nextStep, endTour } = useOnboardingTour()

  return currentStep != null ? (
    <OnboardingPopover
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
