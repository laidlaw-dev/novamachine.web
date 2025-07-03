import { render, fireEvent } from "@testing-library/react"
import LabelledSlider from "./LabelledSlider"

const mock_onChange = vi.fn()

describe("LabelledSlider", () => {
  test("renders", () => {
    const { getByText, getByRole } = render(
      <LabelledSlider
        label="test_label"
        step={1}
        min={0}
        max={10}
        value={0}
        onChange={mock_onChange}
      />,
    )
    expect(getByText("test_label")).toBeInTheDocument()
    expect(getByRole("slider")).toBeInTheDocument()
  })
  test("dragging on the slider calls onChange", () => {
    const { getByRole } = render(
      <LabelledSlider
        label="test_label"
        step={1}
        min={0}
        max={10}
        value={0}
        onChange={mock_onChange}
      />,
    )
    const slider = getByRole("slider")
    fireEvent.change(slider, { target: { value: 3 } })
    expect(mock_onChange).toHaveBeenCalled()
  })
})
