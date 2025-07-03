import { render, fireEvent } from "@testing-library/react"
import { mock_translate } from "../../../_test-helpers/mocks"
import AboutDialog from "./AboutDialog"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

const mock_onClose = vi.fn()

describe("AboutDialog", () => {
  test("renders", () => {
    const { getByRole } = render(
      <AboutDialog open={true} onClose={mock_onClose} />,
    )
    expect(getByRole("dialog")).toBeInTheDocument()
  })
  test("when open = false, does not render", () => {
    const { queryByRole } = render(
      <AboutDialog open={false} onClose={mock_onClose} />,
    )
    expect(queryByRole("dialog")).not.toBeInTheDocument()
  })
  test("clicking on close button calls onClose", () => {
    const { getByRole } = render(
      <AboutDialog open={true} onClose={mock_onClose} />,
    )
    const close = getByRole("button", { name: "common.close" })
    fireEvent.click(close)
    expect(mock_onClose).toHaveBeenCalledOnce()
  })
})
