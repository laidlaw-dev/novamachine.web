import { render, within, fireEvent } from "@testing-library/react"
import { mock_translate } from "../../_test-helpers/mocks"
import DialogActionButton from "./DialogActionButton"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

const mock_onClick = vi.fn()

describe("DialogActionButton", () => {
  test("renders", () => {
    const { getByRole } = render(
      <DialogActionButton onClick={mock_onClick}>
        test_button
      </DialogActionButton>,
    )
    const button = getByRole("button")
    expect(within(button).getByText("test_button")).toBeInTheDocument()
  })
  test("clicking on button calls onClick", () => {
    const { getByRole } = render(
      <DialogActionButton onClick={mock_onClick}>
        test_button
      </DialogActionButton>,
    )
    const button = getByRole("button")
    fireEvent.click(button)
    expect(mock_onClick).toHaveBeenCalledOnce()
  })
})
