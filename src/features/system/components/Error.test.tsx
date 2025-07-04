import { render } from "@testing-library/react"
import { mock_translate } from "../../../_test-helpers/mocks"
import Error from "./Error"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

describe("Error", () => {
  test("renders", () => {
    const { getByText, getByRole } = render(<Error />)
    expect(getByRole("alert")).toBeInTheDocument()
    expect(getByText("system_feedback.error_general")).toBeInTheDocument()
    expect(getByText("system_feedback.error_general_sub_1")).toBeInTheDocument()
    expect(getByText("system_feedback.error_general_sub_2")).toBeInTheDocument()
  })
})
