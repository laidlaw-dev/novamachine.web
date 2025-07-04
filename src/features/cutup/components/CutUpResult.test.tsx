import { render, fireEvent } from "@testing-library/react"
import CutUpResult from "./CutUpResult"

const mock_onDelete = vi.fn()

describe("CutUpResult", () => {
  test("renders", () => {
    const { getByText } = render(
      <CutUpResult
        text={{ index: 1, text: "test_result" }}
        onDelete={mock_onDelete}
      />,
    )
    expect(getByText("test_result")).toBeInTheDocument()
  })
  test("clicking on delete calls onDelete", () => {
    const { getByRole } = render(
      <CutUpResult
        text={{ index: 3, text: "test_result" }}
        onDelete={mock_onDelete}
      />,
    )
    const button = getByRole("button")
    fireEvent.click(button)
    expect(mock_onDelete).toHaveBeenCalledWith(3)
  })
})
