import type { PopperPlacementType } from "@mui/material/Popper"

export interface OnboardingStep {
  key: string
  title?: string
  text: string
  placement?: PopperPlacementType
}
