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
      title: t("onboarding_cutup.source_text_title"),
      text: t("onboarding_cutup.source_text"),
    },
    {
      key: ELEMENT.CUTUP_CUT,
      title: t("onboarding_cutup.cut_controls_title"),
      text: t("onboarding_cutup.cut_controls"),
    },
    {
      key: ELEMENT.CUTUP_JOIN,
      title: t("onboarding_cutup.join_controls_title"),
      text: t("onboarding_cutup.join_controls"),
    },
    {
      key: ELEMENT.CUTUP_CUTUP,
      title: t("onboarding_cutup.cutup_controls_title"),
      text: t("onboarding_cutup.cutup_controls"),
    },
    {
      key: ELEMENT.CUTUP_RESULT,
      title: t("onboarding_cutup.results_panel_title"),
      text: t("onboarding_cutup.results_panel"),
    },
    {
      key: ELEMENT.COMMON_HELP,
      title: t("onboarding_common.help_title"),
      text: t("onboarding_common.help"),
      placement: "left-start",
    },
  ]
}

export default onboardingSteps
