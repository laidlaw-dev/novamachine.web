import { render } from "@testing-library/react"
import Onboarding from "./Onboarding"
import { mock_translate } from "../../../_test-helpers/mocks"
import React from "react"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

const mock_onBoardingTour = vi.fn()

vi.mock("../hooks/useOnboardingTour", async importOriginal => {
  const mod: object = await importOriginal()
  return {
    ...mod,
    default: () => mock_onBoardingTour(),
  }
})

const mock_OnboardingPopup = vi.fn()
vi.mock("./OnboardingPopup", () => ({
  default: (props: Object) => mock_OnboardingPopup(props),
}))

describe("Onboaring", () => {
  test("when tour is not ongoing, does not render OnboardingPopup", () => {
    mock_onBoardingTour.mockReturnValue({
      currentStep: null,
      startTour: () => vi.fn(),
      nextStep: () => vi.fn(),
      endTour: () => vi.fn(),
      registerElement: vi.fn(),
      registerPage: vi.fn(),
    })
    render(
      <Onboarding steps={[]}>
        <div />
      </Onboarding>,
    )
    expect(mock_OnboardingPopup).not.toHaveBeenCalled()
  })
  test("when tour is ongoing, renders OnboardingPopup", () => {
    const targetRef = React.createRef<HTMLDivElement>()
    const mock_onNextStep = vi.fn()
    const mock_onEndTour = vi.fn()
    mock_onBoardingTour.mockReturnValue({
      currentStep: {
        key: "test_key",
        title: "test_title",
        text: "test_text",
        stepNumber: 2,
        totalSteps: 4,
        placement: "top",
        targetElement: targetRef.current,
      },
      startTour: () => vi.fn(),
      nextStep: mock_onNextStep,
      endTour: mock_onEndTour,
      registerElement: vi.fn(),
      registerPage: vi.fn(),
    })
    render(
      <Onboarding steps={[]}>
        <div />
      </Onboarding>,
    )
    expect(mock_OnboardingPopup).toHaveBeenCalledWith({
      title: "test_title",
      text: "test_text",
      stepNumber: 2,
      totalSteps: 4,
      onEnd: mock_onEndTour,
      onNext: mock_onNextStep,
      placement: "top",
      targetElement: targetRef.current,
    })
  })
})
