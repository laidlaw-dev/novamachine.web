import { useTranslation } from "react-i18next"
import FullPageLayout from "../../layouts/FullPageLayout"
import CutUpInputForm, {
  type CutUpInputFormFields,
} from "./components/CutUpInputForm"
import { styled } from "@mui/material/styles"
import { cutUpService } from "./services/cutUpService"
import { useEffect, useReducer, useState } from "react"
import ResultDialog from "./components/ResultDialog"
import ControlBarLayout from "../../layouts/ControlBarLayout"
import IconActionButton from "../../components/inputs/IconActionButton"
import AssignmentOutlined from "@mui/icons-material/AssignmentOutlined"
import { cutUpReducerFunction, initialState } from "./hooks/cutUpReducer"
import useOnboardingTour from "../onboarding/hooks/useOnboardingTour"
import * as ELEMENT from "../../consts/elementKeys"
import * as PAGE from "../../consts/pageKeys"
import SnackbarMessage from "../system_feedback/components/SnackbarMessage"
import { ErrorBoundary } from "react-error-boundary"
import Error from "../system_feedback/components/Error"

const BodyLayout = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}))

type SnackbarMessages =
  | "error_process_text"
  | "error_copy_to_clipboard"
  | "success_copy_to_clipboard"
  | null

const CutUpPage = () => {
  const { t } = useTranslation()
  const [showSnackbar, setShowSnackbar] = useState<SnackbarMessages>(null)

  const { registerElement } = useOnboardingTour()

  const [cutUpResults, cutUpDispatch] = useReducer(
    cutUpReducerFunction,
    initialState,
  )
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = (data: CutUpInputFormFields) => {
    try {
      const cutUpResults = cutUpService(
        data.inputText,
        { length: data.cutLength, randomize: data.cutRandomize * 0.1 },
        { length: data.joinLength, randomize: data.joinRandomize * 0.1 },
      )
      cutUpDispatch({ type: "add", payload: { results: cutUpResults } })
    } catch {
      setShowSnackbar("error_process_text")
    }
  }

  const handleDeleteSingle = (index: number) => {
    cutUpDispatch({ type: "delete_single", payload: { index: index } })
  }

  const handleDeleteAll = () => {
    cutUpDispatch({ type: "delete_all" })
  }

  const handleReorder = (keys: string[]) => {
    cutUpDispatch({
      type: "reorder",
      payload: {
        indicies: keys.map(i => parseInt(i)),
      },
    })
  }

  const handleCopyToClipboard = () => {
    try {
      const text = cutUpResults.results
        .map(item => item.text)
        .join(" ")
        .trim()
      navigator.clipboard.writeText(text)
      setShowSnackbar("success_copy_to_clipboard")
    } catch {
      setShowSnackbar("error_copy_to_clipboard")
    }
  }

  useEffect(() => {
    if (cutUpResults.results.length > 0) {
      setShowResult(true)
    }
  }, [cutUpResults, setShowResult])

  return (
    <>
      <FullPageLayout title={t("cut_up.title")} pageKey={PAGE.CUTUP}>
        <ErrorBoundary fallback={<Error />}>
          <BodyLayout>
            <ControlBarLayout>
              <IconActionButton
                ref={element => registerElement(ELEMENT.CUTUP_RESULT, element)}
                onClick={() => setShowResult(true)}
                disabled={cutUpResults.results.length === 0}
                title={t("common.show_results")}
              >
                <AssignmentOutlined />
              </IconActionButton>
            </ControlBarLayout>
            <CutUpInputForm onSubmitForm={handleSubmit} />
          </BodyLayout>
          <ResultDialog
            cutUpResults={cutUpResults.results}
            open={showResult}
            onClose={() => setShowResult(false)}
            onDeleteSingle={handleDeleteSingle}
            onDeleteAll={handleDeleteAll}
            onReorder={handleReorder}
            onCopyToClipboard={handleCopyToClipboard}
          />
          <SnackbarMessage
            message={t("system_feedback.error_process_text")}
            severity="error"
            open={showSnackbar === "error_process_text"}
            onClose={() => setShowSnackbar(null)}
          />
          <SnackbarMessage
            message={t("system_feedback.error_copy_to_clipboard")}
            severity="error"
            open={showSnackbar === "error_copy_to_clipboard"}
            onClose={() => setShowSnackbar(null)}
          />
          <SnackbarMessage
            message={t("system_feedback.success_copy_to_clipboard")}
            severity="success"
            open={showSnackbar === "success_copy_to_clipboard"}
            onClose={() => setShowSnackbar(null)}
          />
        </ErrorBoundary>
      </FullPageLayout>
    </>
  )
}

export default CutUpPage
