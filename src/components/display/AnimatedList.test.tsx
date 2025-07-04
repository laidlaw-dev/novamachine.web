import { render } from "@testing-library/react"
import AnimatedList from "./AnimatedList"

const mock_onReorder = vi.fn()

describe("AnimatedList", () => {
  test("renders", () => {
    const { getByText } = render(
      <AnimatedList onReorder={mock_onReorder}>
        <div key="1">test_item_1</div>
        <div key="2">test_item_2</div>
        <div key="3">test_item_3</div>
      </AnimatedList>,
    )
    expect(getByText("test_item_1")).toBeInTheDocument()
    expect(getByText("test_item_2")).toBeInTheDocument()
    expect(getByText("test_item_3")).toBeInTheDocument()
  })
})
