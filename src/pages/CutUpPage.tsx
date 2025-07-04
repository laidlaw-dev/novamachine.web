import { useTranslation } from "react-i18next"
import FullPageScaffold from "../components/display/FullPageScaffold"
import * as PAGE from "../consts/pageKeys"
import { ErrorBoundary } from "react-error-boundary"
import Error from "../features/system/components/Error"
import CutUp from "../features/cutUp/components/CutUp"

const CutUpPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <FullPageScaffold title={t("cut_up.title")} pageKey={PAGE.CUTUP}>
        <ErrorBoundary fallback={<Error />}>
          <CutUp />
        </ErrorBoundary>
      </FullPageScaffold>
    </>
  )
}

export default CutUpPage
