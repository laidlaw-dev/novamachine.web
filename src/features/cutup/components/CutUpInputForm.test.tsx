import { render, fireEvent, waitFor, within } from "@testing-library/react"
import { mock_translate } from "../../../_test-helpers/mocks"
import CutUpInputForm from "./CutUpInputForm"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mock_translate,
  }),
}))

const mock_registerElement = vi.fn()
vi.mock("../../onboarding/hooks/useOnboardingTour", () => ({
  default: () => ({
    registerElement: (key: string) => mock_registerElement(key),
  }),
}))

const mock_onSubmitForm = vi.fn()

describe("CutUpInputForm", () => {
  test("when form valid clicking on submit calls onSubmitForm", async () => {
    const { getByRole, getByTestId } = render(
      <CutUpInputForm onSubmitForm={mock_onSubmitForm} />,
    )

    fireEvent.change(getByRole("textbox"), {
      target: {
        defaultValue: "test_text",
      },
    })

    fireEvent.change(within(getByTestId("cutLength")).getByRole("slider"), {
      target: {
        value: 3,
      },
    })

    fireEvent.change(within(getByTestId("cutRandomize")).getByRole("slider"), {
      target: {
        value: 6,
      },
    })

    fireEvent.change(within(getByTestId("joinLength")).getByRole("slider"), {
      target: {
        value: 4,
      },
    })

    fireEvent.change(within(getByTestId("joinRandomize")).getByRole("slider"), {
      target: {
        value: 7,
      },
    })
    const submit = getByRole("button", { name: "cut_up.action" })
    fireEvent.click(submit)
    await waitFor(() =>
      expect(mock_onSubmitForm).toHaveBeenCalledWith({
        cutLength: 3,
        cutRandomize: 6,
        joinLength: 4,
        joinRandomize: 7,
        inputText: "test_text",
      }),
    )
  })
  test("when form invalid clicking on submit renders error message", async () => {
    const { getByRole } = render(
      <CutUpInputForm onSubmitForm={mock_onSubmitForm} />,
    )
    const submit = getByRole("button", { name: "cut_up.action" })
    fireEvent.click(submit)
    await waitFor(() =>
      expect(
        within(getByRole("alert")).getByText("cut_up.validation_no_text"),
      ).toBeInTheDocument(),
    )
  })
})
