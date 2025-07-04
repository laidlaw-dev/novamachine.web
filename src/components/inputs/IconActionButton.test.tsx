import { render, within, fireEvent, act } from "@testing-library/react"
import { mock_translate } from "../../_test-helpers/mocks"
import IconActionButton from "./IconActionButton"
import Delete from "@mui/icons-material/Delete"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

const mock_onClick = vi.fn()

describe("IconActionButton", () => {
  test("renders with tooltip", () => {
    const { getByRole } = render(
      <IconActionButton title="test_title" onClick={mock_onClick}>
        <Delete />
      </IconActionButton>,
    )
    const button = getByRole("button")

    expect(button).not.toBeDisabled()
    expect(within(button).getByTestId("DeleteIcon")).toBeInTheDocument()

    vi.useFakeTimers()
    fireEvent.mouseOver(button)
    act(() => vi.advanceTimersByTime(1000))
    expect(getByRole("tooltip")).toBeInTheDocument()
    vi.useRealTimers()
  })
  test("when disabled renders without tooltip", () => {
    const { getByRole, queryByRole } = render(
      <IconActionButton title="test_title" onClick={mock_onClick} disabled>
        <Delete />
      </IconActionButton>,
    )
    const button = getByRole("button")
    expect(button).toBeDisabled()
    expect(within(button).getByTestId("DeleteIcon")).toBeInTheDocument()

    vi.useFakeTimers()
    fireEvent.mouseOver(button)
    act(() => vi.advanceTimersByTime(1000))
    expect(queryByRole("tooltip")).not.toBeInTheDocument()
    vi.useRealTimers()
  })
  test("clicking on button calls onClick", () => {
    const { getByRole } = render(
      <IconActionButton title="test_title" onClick={mock_onClick}>
        <Delete />
      </IconActionButton>,
    )
    const button = getByRole("button")
    fireEvent.click(button)
    expect(mock_onClick).toHaveBeenCalledOnce()
  })
})
