import { render, within, fireEvent, act } from "@testing-library/react"
import SnackbarMessage from "./SnackbarMessage"
import { durations } from "../../theme/durations"

const mock_onClose = vi.fn()

describe("SnackbarMessage", () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })
  test("renders", () => {
    const { getByRole } = render(
      <SnackbarMessage
        message="test_message"
        severity="error"
        open={true}
        onClose={mock_onClose}
      />,
    )

    const alert = getByRole("alert")
    expect(within(alert).getByText("test_message")).toBeInTheDocument()
  })
  test("when open = false, does not render", () => {
    const { queryByRole } = render(
      <SnackbarMessage
        message="test_message"
        severity="error"
        open={false}
        onClose={mock_onClose}
      />,
    )
    expect(queryByRole("alert")).not.toBeInTheDocument()
  })
  test("clicking on close button calls onClose", () => {
    const { getByRole } = render(
      <SnackbarMessage
        message="test_message"
        severity="error"
        open={true}
        onClose={mock_onClose}
      />,
    )

    const alert = getByRole("alert")
    const close = within(alert).getByRole("button")
    fireEvent.click(close)
    expect(mock_onClose).toHaveBeenCalledOnce()
  })
  test("after auto duration calls onClose", () => {
    vi.useFakeTimers()
    render(
      <SnackbarMessage
        message="test_message"
        severity="error"
        open={true}
        onClose={mock_onClose}
      />,
    )
    act(() => vi.advanceTimersByTime(durations.snackbar + 1000))
    expect(mock_onClose).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })
})
