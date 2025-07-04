import { render } from "@testing-library/react"
import FullPageScaffold from "./FullPageScaffold"

const mock_registerPage = vi.fn()

vi.mock("../../features/onboarding/hooks/useOnboardingTour", () => ({
  default: () => ({
    registerPage: (key: string) => mock_registerPage(key),
  }),
}))

const mock_SystemMenu = vi.fn()
vi.mock("../../features/system/components/SystemMenu", () => ({
  default: (props: object) => mock_SystemMenu(props),
}))

describe("FullPageScaffold", () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })
  test("renders title", () => {
    const { getByText } = render(
      <FullPageScaffold title="test_title">
        <div />
      </FullPageScaffold>,
    )
    expect(getByText("test_title")).toBeInTheDocument()
  })
  test("when has pageKey registers page with onboarding", () => {
    render(
      <FullPageScaffold title="test_title" pageKey="testKey">
        <div />
      </FullPageScaffold>,
    )
    expect(mock_registerPage).toHaveBeenCalledWith("testKey")
    expect(mock_SystemMenu).toHaveBeenCalledWith({
      hasOnboardingTour: true,
    })
  })
  test("when does not have pageKey does not register page with onboarding", () => {
    render(
      <FullPageScaffold title="test_title">
        <div />
      </FullPageScaffold>,
    )
    expect(mock_registerPage).not.toHaveBeenCalled()
    expect(mock_SystemMenu).toHaveBeenCalledWith({
      hasOnboardingTour: false,
    })
  })
})
