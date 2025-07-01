import { useTranslation } from "react-i18next"
import CutUpInputForm, { type CutUpInputFormFields } from "./CutUpInputForm"
import { styled } from "@mui/material/styles"
import { cutUpService } from "../services/cutUpService"
import { useReducer, useState } from "react"
import { cutUpReducerFunction, initialState } from "../hooks/cutUpReducer"
import useOnboardingTour from "../../onboarding/hooks/useOnboardingTour"
import * as ELEMENT from "../../../consts/elementKeys"
import SnackbarMessage from "../../system_feedback/components/SnackbarMessage"
import CutUpResultsPanel from "./CutUpResultPanel"
import SplitPanelResponsiveLayout from "../../../layouts/SplitPanelResponsiveLayout"

const InputLayout = styled("div")(() => ({
  flex: 2,
  display: "flex",
  flexDirection: "column",
}))

const ResultLayout = styled("div")(() => ({
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
}))

type SnackbarMessages =
  | "error_process_text"
  | "error_copy_to_clipboard"
  | "success_copy_to_clipboard"
  | null

const CutUp = () => {
  const { t } = useTranslation()
  const [showSnackbar, setShowSnackbar] = useState<SnackbarMessages>(null)

  const { registerElement } = useOnboardingTour()

  const [cutUpResults, cutUpDispatch] = useReducer(
    cutUpReducerFunction,
    initialState,
  )

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

  return (
    <>
      <SplitPanelResponsiveLayout>
        <InputLayout>
          <CutUpInputForm onSubmitForm={handleSubmit} />
        </InputLayout>
        <ResultLayout
          ref={element => registerElement(ELEMENT.CUTUP_RESULT, element)}
        >
          <CutUpResultsPanel
            cutUpResults={cutUpResults.results}
            onDeleteSingle={handleDeleteSingle}
            onDeleteAll={handleDeleteAll}
            onReorder={handleReorder}
            onCopyToClipboard={handleCopyToClipboard}
          />
        </ResultLayout>
      </SplitPanelResponsiveLayout>
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
    </>
  )
}

export default CutUp
