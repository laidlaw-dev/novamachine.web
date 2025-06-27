import { type ReactNode } from "react"
import OnboardingPopover from "./OnboardingPopover"
import OnboardingTourProvider from "../../../providers/onboardingTourProvider"
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
  if (currentStep == null) return null
  return (
    <OnboardingPopover
      title={currentStep.title}
      text={currentStep.text}
      stepNumber={currentStep.stepNumber}
      totalSteps={currentStep.totalSteps}
      targetElement={currentStep.targetElement}
      onNext={nextStep}
      onEnd={endTour}
    />
  )
}

export default Onboarding
