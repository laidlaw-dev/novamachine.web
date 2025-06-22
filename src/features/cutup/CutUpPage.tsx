import { useTranslation } from "react-i18next"
import FullPageLayout from "../../layouts/FullPageLayout"
import CutUpInputForm from "./components/CutUpInputForm"
import { styled } from "@mui/material/styles"
import { cutUpService } from "./services/cutUpService"
import { useEffect, useState } from "react"
import ResultDialog from "./components/ResultDialog"

const BodyLayout = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
}))

const CutUpPage = () => {
  const { t } = useTranslation()

  const [cutUps, setCutUps] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = (text: string) => {
    const cutUps = cutUpService(text)
    setCutUps(cutUps)
  }

  useEffect(() => {
    if (cutUps.length > 0) {
      setShowResult(true)
    }
  }, [cutUps, setShowResult])

  return (
    <FullPageLayout title={t("cut_up.title")}>
      <BodyLayout>
        <CutUpInputForm
          hasResults={cutUps.length > 0}
          onShowResults={() => setShowResult(true)}
          onSubmitForm={handleSubmit}
        />
      </BodyLayout>
      <ResultDialog
        cutUps={cutUps}
        open={showResult}
        onClose={() => setShowResult(false)}
      />
    </FullPageLayout>
  )
}

export default CutUpPage
