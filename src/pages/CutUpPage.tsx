import { useTranslation } from "react-i18next"
import FullPageLayout from "../layouts/FullPageLayout"
import * as PAGE from "../consts/pageKeys"
import { ErrorBoundary } from "react-error-boundary"
import Error from "../features/system/components/Error"
import CutUp from "../features/cutup/components/CutUp"

const CutUpPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <FullPageLayout title={t("cut_up.title")} pageKey={PAGE.CUTUP}>
        <ErrorBoundary fallback={<Error />}>
          <CutUp />
        </ErrorBoundary>
      </FullPageLayout>
    </>
  )
}

export default CutUpPage
