import { render, within } from "@testing-library/react"
import FullSizeTextArea from "./FullSizeTextArea"

describe("FullSizeTextArea", () => {
  test("renders with value", () => {
    const { getByRole } = render(
      <FullSizeTextArea placeholder="test_placeholder">
        test_value
      </FullSizeTextArea>,
    )
    const textbox = getByRole("textbox")
    expect(within(textbox).getByText("test_value")).toBeInTheDocument()
  })
})
