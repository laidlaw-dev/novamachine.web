import { useTranslation } from "react-i18next"
import FullPageLayout from "../../layouts/FullPageLayout"
import CutUpInputForm from "./components/CutUpInputForm"
import { styled } from "@mui/material/styles"
import { cutUpService } from "./services/cutUpService"
import { useEffect, useState } from "react"
import ResultDialog from "./components/ResultDialog"
import ControlBarLayout from "../../layouts/ControlBarLayout"
import IconActionButton from "../../components/inputs/IconActionButton"
import Assignment from "@mui/icons-material/Assignment"

const BodyLayout = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}))

const CutUpPage = () => {
  const { t } = useTranslation()

  const [cutUpResults, setCutUpResults] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = (text: string) => {
    const cutUpResults = cutUpService(text)
    setCutUpResults(cutUpResults)
  }

  useEffect(() => {
    if (cutUpResults.length > 0) {
      setShowResult(true)
    }
  }, [cutUpResults, setShowResult])

  return (
    <FullPageLayout title={t("cut_up.title")}>
      <BodyLayout>
        <ControlBarLayout>
          <IconActionButton
            onClick={() => setShowResult(true)}
            disabled={cutUpResults.length === 0}
            title={t("common.show_results")}
          >
            <Assignment />
          </IconActionButton>
        </ControlBarLayout>
        <CutUpInputForm onSubmitForm={handleSubmit} />
      </BodyLayout>
      <ResultDialog
        cutUpResults={cutUpResults}
        open={showResult}
        onClose={() => setShowResult(false)}
      />
    </FullPageLayout>
  )
}

export default CutUpPage
