import { useTranslation } from "react-i18next"
import FullPageLayout from "../../layouts/FullPageLayout"
import CutUpInputForm from "./components/CutUpInputForm"
import { styled } from "@mui/material/styles"
import { cutUpService } from "./services/cutUpTextService"

const BodyLayout = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
}))

const CutUpPage = () => {
  const { t } = useTranslation()

  const handleSubmit = (text: string) => {
    const result = cutUpService(text)
    result.forEach(item => console.log(item))
  }

  return (
    <FullPageLayout title={t("cut_up.title")}>
      <BodyLayout>
        <CutUpInputForm onSubmitForm={handleSubmit} />
      </BodyLayout>
    </FullPageLayout>
  )
}

export default CutUpPage
function cutUpTextService(text: string) {
  throw new Error("Function not implemented.")
}
