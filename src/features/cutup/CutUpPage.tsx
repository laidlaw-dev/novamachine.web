import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import FullPageLayout from "../../layouts/FullPageLayout"

const CutUpPage = () => {
  const { t } = useTranslation()

  return (
    <FullPageLayout title={t("cut_up.title")}>
      <Typography variant="h2">{t("cut_up.title")}</Typography>
    </FullPageLayout>
  )
}

export default CutUpPage
