import { render, fireEvent, within } from "@testing-library/react"
import { mock_translate } from "../../../_test-helpers/mocks"
import CutUpResultsPanel from "./CutUpResultPanel"
import type { AnimatedListProps } from "../../../components/display/AnimatedList"

const FakeAnimatedList = ({ children, onReorder }: AnimatedListProps) => {
  return (
    <div>
      {children}
      <button onClick={() => onReorder(["3", "2", "1"])}>test_reorder</button>
    </div>
  )
}

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

vi.mock("../../../components/display/AnimatedList", () => ({
  default: (props: AnimatedListProps) => {
    return FakeAnimatedList(props)
  },
}))

const mock_onDeleteSingle = vi.fn()
const mock_onDeleteAll = vi.fn()
const mock_onReorder = vi.fn()
const mock_onCopyToClipboard = vi.fn()

const results = [
  {
    index: 1,
    text: "test_result_1",
  },
  {
    index: 2,
    text: "test_result_2",
  },
  {
    index: 3,
    text: "test_result_3",
  },
]

describe("CutUpResultsPanel", () => {
  test("renders results", () => {
    const { getByTestId } = render(
      <CutUpResultsPanel
        cutUpResults={results}
        onDeleteSingle={mock_onDeleteSingle}
        onDeleteAll={mock_onDeleteAll}
        onReorder={mock_onReorder}
        onCopyToClipboard={mock_onCopyToClipboard}
      />,
    )
    expect(getByTestId("result_1")).toBeInTheDocument()
    expect(getByTestId("result_2")).toBeInTheDocument()
    expect(getByTestId("result_3")).toBeInTheDocument()
  })
  test("when no results renders no results", () => {
    const { getByText } = render(
      <CutUpResultsPanel
        cutUpResults={[]}
        onDeleteSingle={mock_onDeleteSingle}
        onDeleteAll={mock_onDeleteAll}
        onReorder={mock_onReorder}
        onCopyToClipboard={mock_onCopyToClipboard}
      />,
    )
    expect(getByText("cut_up.no_results")).toBeInTheDocument()
  })
  test("clicking on result delete calls onDeleteSingle", () => {
    const { getByTestId } = render(
      <CutUpResultsPanel
        cutUpResults={results}
        onDeleteSingle={mock_onDeleteSingle}
        onDeleteAll={mock_onDeleteAll}
        onReorder={mock_onReorder}
        onCopyToClipboard={mock_onCopyToClipboard}
      />,
    )
    const result = getByTestId("result_2")
    const deleteButton = within(result).getByRole("button")
    fireEvent.click(deleteButton)
    expect(mock_onDeleteSingle).toHaveBeenCalledWith(2)
  })
  test("reordering results calls onReorder", () => {
    const { getByRole } = render(
      <CutUpResultsPanel
        cutUpResults={results}
        onDeleteSingle={mock_onDeleteSingle}
        onDeleteAll={mock_onDeleteAll}
        onReorder={mock_onReorder}
        onCopyToClipboard={mock_onCopyToClipboard}
      />,
    )
    const reorderButton = getByRole("button", { name: "test_reorder" })
    fireEvent.click(reorderButton)
    expect(mock_onReorder).toHaveBeenCalledWith(["3", "2", "1"])
  })
  test("clicking on delete all calls onDeleteAll", () => {
    const { getByRole } = render(
      <CutUpResultsPanel
        cutUpResults={results}
        onDeleteSingle={mock_onDeleteSingle}
        onDeleteAll={mock_onDeleteAll}
        onReorder={mock_onReorder}
        onCopyToClipboard={mock_onCopyToClipboard}
      />,
    )

    const deleteButton = getByRole("button", { name: "common.delete_all" })
    fireEvent.click(deleteButton)
    expect(mock_onDeleteAll).toHaveBeenCalled()
  })
  test("clicking on copy to clipboard calls onCopyToClipboard", () => {
    const { getByRole } = render(
      <CutUpResultsPanel
        cutUpResults={results}
        onDeleteSingle={mock_onDeleteSingle}
        onDeleteAll={mock_onDeleteAll}
        onReorder={mock_onReorder}
        onCopyToClipboard={mock_onCopyToClipboard}
      />,
    )

    const deleteButton = getByRole("button", {
      name: "common.copy_to_clipboard",
    })
    fireEvent.click(deleteButton)
    expect(mock_onCopyToClipboard).toHaveBeenCalled()
  })
})
