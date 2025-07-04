import { render, fireEvent, within, act } from "@testing-library/react"
import * as ELEMENT from "../../../consts/elementKeys"
import { mock_translate } from "../../../_test-helpers/mocks"
import SystemMenu from "./SystemMenu"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

const mock_registerElement = vi.fn()
const mock_startTour = vi.fn()

vi.mock("../../onboarding/hooks/useOnboardingTour", () => ({
  default: () => ({
    registerElement: (key: string) => mock_registerElement(key),
    startTour: () => mock_startTour(),
  }),
}))

describe("SystemMenu", () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })
  test("renders and adds to onboarding", () => {
    const { getByRole } = render(<SystemMenu hasOnboardingTour={true} />)

    expect(mock_registerElement).toHaveBeenCalledWith(ELEMENT.COMMON_HELP)

    expect(getByRole("button")).toBeInTheDocument()
  })
  test("when hasOnboardingTour = false, renders but does not add to onboarding", () => {
    const { getByRole } = render(<SystemMenu hasOnboardingTour={false} />)

    expect(mock_registerElement).not.toHaveBeenCalled()

    expect(getByRole("button")).toBeInTheDocument()
  })
  test("clicking on 'help' starts onboarding tour", () => {
    const { getByRole } = render(<SystemMenu hasOnboardingTour={true} />)

    const button = getByRole("button")
    fireEvent.click(button)

    const menu = getByRole("presentation")
    const help = within(menu).getByText("onboarding.help")
    fireEvent.click(help)
    expect(mock_startTour).toHaveBeenCalledOnce()
  })
  test("when hasOnboardingTour = false, does not render help", () => {
    const { getByRole } = render(<SystemMenu hasOnboardingTour={false} />)

    const button = getByRole("button")
    fireEvent.click(button)

    const menu = getByRole("presentation")
    expect(within(menu).queryByText("onboarding.help")).not.toBeInTheDocument()
  })
  test("clicking on 'about' displays about dialog", () => {
    const { getByRole } = render(<SystemMenu hasOnboardingTour={true} />)

    const button = getByRole("button")
    fireEvent.click(button)

    const menu = getByRole("presentation")
    const about = within(menu).getByText("common.about")
    fireEvent.click(about)
    expect(getByRole("dialog")).toBeInTheDocument()
  })
  test("clicking on the dialog 'close' hides the dialog", () => {
    const { getByRole, queryByRole } = render(
      <SystemMenu hasOnboardingTour={true} />,
    )

    const button = getByRole("button")
    fireEvent.click(button)

    const menu = getByRole("presentation")
    const about = within(menu).getByText("common.about")
    fireEvent.click(about)

    const dialog = getByRole("dialog")
    const close = within(dialog).getByRole("button", { name: "common.close" })

    vi.useFakeTimers()
    fireEvent.click(close)
    act(() => vi.advanceTimersByTime(2000))
    expect(queryByRole("dialog")).not.toBeInTheDocument()
    vi.useRealTimers()
  })
})
