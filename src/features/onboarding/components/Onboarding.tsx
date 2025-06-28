import { type ReactNode } from "react"
import OnboardingPopover from "./OnboardingPopover"
import OnboardingTourProvider from "../../../providers/OnboardingTourProvider"
import useOnboardingTour from "../hooks/useOnboardingTour"

const popoverSteps = [
  {
    key: "textInput",
    title: "Text Input",
    text: "Some text. The quick brown fox jumps over the lazy dog.",
  },
  {
    key: "controls",
    title: "Controls",
    text: "Some text. The quick brown fox jumps over the lazy dog.",
  },
  {
    key: "cutup",
    title: "Cutup",
    text: "Some text. The quick brown fox jumps over the lazy dog.",
  },
]

interface OnboardingProps {
  children: ReactNode | ReactNode[]
}

const Onboarding = ({ children }: OnboardingProps) => {
  return (
    <OnboardingTourProvider steps={popoverSteps}>
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
