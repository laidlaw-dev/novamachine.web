import { styled, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import PopperWithArrow from "../../../components/display/PopperWithArrow"
import { type PopperPlacementType } from "@mui/material"
import type { Ref } from "react"
import { useTranslation } from "react-i18next"
import FlexSpacer from "../../../layouts/FlexSpacer"

const PopoverContainer = styled(Paper)(({ theme }) => ({
  width: "300px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  color: theme.palette.info.contrastText,
  backgroundColor: theme.palette.info.main,
}))

const PopoverTitle = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "flex-end",
  justifyContent: "space-between",
}))

const PopoverBody = styled("div")(() => ({
  flex: 1,
}))

const PopoverButtons = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

interface OnboardingPopupProps {
  targetElement: Element
  title?: string
  text: string
  stepNumber: number
  totalSteps: number
  placement?: PopperPlacementType
  onNext: () => void
  onEnd: () => void
  ref?: Ref<HTMLDivElement>
}

const OnboardingPopup = ({
  targetElement,
  title,
  text,
  stepNumber,
  totalSteps,
  placement,
  onNext,
  onEnd,
  ref,
}: OnboardingPopupProps) => {
  const { t } = useTranslation()

  const theme = useTheme()

  return (
    <PopperWithArrow
      open={true}
      anchorEl={targetElement}
      arrowColor={theme.palette.info.main}
      placement={placement}
      ref={ref}
    >
      <PopoverContainer>
        <PopoverTitle>
          {title && <Typography variant="h6">{title}</Typography>}
          <FlexSpacer />
          <Typography variant="body2">
            {stepNumber} / {totalSteps}
          </Typography>
        </PopoverTitle>
        <PopoverBody>
          <Typography variant="body1">{text}</Typography>
        </PopoverBody>
        <PopoverButtons>
          <Button variant="text" color="inherit" onClick={onEnd}>
            {t("onboarding.end_tour")}
          </Button>
          {stepNumber < totalSteps && (
            <Button variant="text" color="inherit" onClick={onNext}>
              {t("onboarding.next_step")}
            </Button>
          )}
        </PopoverButtons>
      </PopoverContainer>
    </PopperWithArrow>
  )
}

export default OnboardingPopup
