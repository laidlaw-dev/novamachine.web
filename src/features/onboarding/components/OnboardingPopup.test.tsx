import { render, fireEvent } from "@testing-library/react"
import { mock_translate } from "../../../_test-helpers/mocks"
import OnboardingPopup from "./OnboardingPopup"
import React from "react"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

const mock_onNext = vi.fn()
const mock_onEnd = vi.fn()

describe("OnboardingPopup", () => {
  test("renders", () => {
    const targetRef = React.createRef<HTMLDivElement>()
    const { getByText, getByRole } = render(
      <div>
        <div ref={targetRef} />
        <OnboardingPopup
          targetElement={targetRef.current!}
          title="test_title"
          text="test_text"
          stepNumber={2}
          totalSteps={4}
          onNext={mock_onNext}
          onEnd={mock_onEnd}
        />
      </div>,
    )
    expect(getByText("test_title")).toBeInTheDocument()
    expect(getByText("test_text")).toBeInTheDocument()
    expect(getByText("2 / 4")).toBeInTheDocument()
    expect(
      getByRole("button", { name: "onboarding.end_tour" }),
    ).toBeInTheDocument()
    expect(
      getByRole("button", { name: "onboarding.next_step" }),
    ).toBeInTheDocument()
  })
  test("when no title, renders", () => {
    const targetRef = React.createRef<HTMLDivElement>()
    const { getByText, getByRole } = render(
      <div>
        <div ref={targetRef} />
        <OnboardingPopup
          targetElement={targetRef.current!}
          text="test_text"
          stepNumber={2}
          totalSteps={4}
          onNext={mock_onNext}
          onEnd={mock_onEnd}
        />
      </div>,
    )
    expect(getByText("test_text")).toBeInTheDocument()
    expect(getByText("2 / 4")).toBeInTheDocument()
    expect(
      getByRole("button", { name: "onboarding.end_tour" }),
    ).toBeInTheDocument()
    expect(
      getByRole("button", { name: "onboarding.next_step" }),
    ).toBeInTheDocument()
  })
  test("when on last step, does not render next button", () => {
    const targetRef = React.createRef<HTMLDivElement>()
    const { getByText, getByRole, queryByRole } = render(
      <div>
        <div ref={targetRef} />
        <OnboardingPopup
          targetElement={targetRef.current!}
          text="test_text"
          stepNumber={4}
          totalSteps={4}
          onNext={mock_onNext}
          onEnd={mock_onEnd}
        />
      </div>,
    )
    expect(getByText("test_text")).toBeInTheDocument()
    expect(getByText("4 / 4")).toBeInTheDocument()
    expect(
      getByRole("button", { name: "onboarding.end_tour" }),
    ).toBeInTheDocument()
    expect(
      queryByRole("button", { name: "onboarding.next_step" }),
    ).not.toBeInTheDocument()
  })
  test("click on end button calls onEnd", () => {
    const targetRef = React.createRef<HTMLDivElement>()
    const { getByRole } = render(
      <div>
        <div ref={targetRef} />
        <OnboardingPopup
          targetElement={targetRef.current!}
          title="test_title"
          text="test_text"
          stepNumber={2}
          totalSteps={4}
          onNext={mock_onNext}
          onEnd={mock_onEnd}
        />
      </div>,
    )
    const button = getByRole("button", { name: "onboarding.end_tour" })
    fireEvent.click(button)
    expect(mock_onEnd).toHaveBeenCalledOnce()
  })
  test("click on next button calls onNext", () => {
    const targetRef = React.createRef<HTMLDivElement>()
    const { getByRole } = render(
      <div>
        <div ref={targetRef} />
        <OnboardingPopup
          targetElement={targetRef.current!}
          title="test_title"
          text="test_text"
          stepNumber={2}
          totalSteps={4}
          onNext={mock_onNext}
          onEnd={mock_onEnd}
        />
      </div>,
    )
    const button = getByRole("button", { name: "onboarding.next_step" })
    fireEvent.click(button)
    expect(mock_onNext).toHaveBeenCalledOnce()
  })
})
