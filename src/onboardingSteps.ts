import type { TFunction } from "i18next"
import * as ELEMENT from "./consts/elementKeys"
import type { OnboardingStep } from "./types/index"

const onboardingSteps = (
  t: TFunction<"translation", undefined>,
): OnboardingStep[] => {
  return [
    {
      key: ELEMENT.CUTUP_SOURCE_TEXT,
      title: t("onboarding_cutup.intro_title"),
      text: t("onboarding_cutup.intro_text"),
    },
    {
      key: ELEMENT.CUTUP_SOURCE_TEXT,
      text: t("onboarding_cutup.source_text"),
    },
    {
      key: ELEMENT.CUTUP_CUT,
      text: t("onboarding_cutup.cut_controls"),
    },
    {
      key: ELEMENT.CUTUP_JOIN,
      text: t("onboarding_cutup.join_controls"),
    },
    {
      key: ELEMENT.CUTUP_CUTUP,
      text: t("onboarding_cutup.cutup_controls"),
    },
    {
      key: ELEMENT.CUTUP_RESULT,
      text: t("onboarding_cutup.results_panel"),
    },
    {
      key: ELEMENT.COMMON_HELP,
      text: t("onboarding_common.help"),
      placement: "left-start",
    },
  ]
}

export default onboardingSteps
