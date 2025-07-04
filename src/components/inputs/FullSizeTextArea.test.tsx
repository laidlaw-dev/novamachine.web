import { render, within } from "@testing-library/react"
import FullSizeTextArea from "./FullSizeTextArea"

describe("FullSizeTextArea", () => {
  test("renders with defaultValue", () => {
    const { getByRole, queryByRole } = render(
      <FullSizeTextArea
        placeholder="test_placeholder"
        defaultValue="test_value"
      />,
    )
    const textbox = getByRole("textbox")
    expect(within(textbox).getByText("test_value")).toBeInTheDocument()
    expect(queryByRole("alert")).not.toBeInTheDocument()
  })
  test("when errorMessage, renders error message", () => {
    const { getByRole } = render(
      <FullSizeTextArea
        placeholder="test_placeholder"
        defaultValue="test_value"
        errorMessage="test_error"
      />,
    )
    expect(
      within(getByRole("alert")).getByText("test_error"),
    ).toBeInTheDocument()
  })
})
