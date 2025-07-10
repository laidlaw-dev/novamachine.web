import { fireEvent, render, within } from "@testing-library/react"
import FullSizeTextArea from "./FullSizeTextArea"
import { mock_translate } from "../../_test-helpers/mocks"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

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
  test("clicking on clear button calls onClearText", () => {
    const mock_onClearText = vi.fn()

    const { getByRole } = render(
      <FullSizeTextArea
        placeholder="test_placeholder"
        defaultValue="test_value"
        onClearText={mock_onClearText}
      />,
    )
    fireEvent.click(getByRole("button", { name: "cut_up.clear_source_text" }))
    expect(mock_onClearText).toHaveBeenCalledOnce()
  })
  test("when no clearText prop, does not render clear button", () => {
    const { queryByRole } = render(
      <FullSizeTextArea
        placeholder="test_placeholder"
        defaultValue="test_value"
      />,
    )
    expect(
      queryByRole("button", { name: "cut_up.clear_source_text" }),
    ).not.toBeInTheDocument()
  })
})
