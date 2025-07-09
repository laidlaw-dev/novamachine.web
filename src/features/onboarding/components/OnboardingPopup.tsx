import { styled, useTheme } from "@mui/material/styles"
import PopperWithArrow from "../../../components/display/PopperWithArrow"
import { type PopperPlacementType } from "@mui/material"
import type { Ref } from "react"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useTranslation } from "react-i18next"
import FlexSpacer from "../../../layouts/FlexSpacer"

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
  const theme = useTheme()

  return (
    <PopperWithArrow
      open={true}
      anchorEl={targetElement}
      arrowColor={theme.palette.info.main}
      placement={placement}
      ref={ref}
      aria-label={title}
    >
      <OnboardingPopupContent
        title={title}
        text={text}
        stepNumber={stepNumber}
        totalSteps={totalSteps}
        onNext={onNext}
        onEnd={onEnd}
      />
    </PopperWithArrow>
  )
}

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

interface OnboardingPopupContentProps {
  title?: string
  text: string
  stepNumber: number
  totalSteps: number
  onNext: () => void
  onEnd: () => void
}

const OnboardingPopupContent = ({
  title,
  text,
  stepNumber,
  totalSteps,
  onNext,
  onEnd,
}: OnboardingPopupContentProps) => {
  const { t } = useTranslation()

  return (
    <PopoverContainer>
      <PopoverTitle>
        {title && <Typography variant="h6">{title}</Typography>}
        <FlexSpacer />
        <Typography variant="body2">
          {stepNumber}/{totalSteps}
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
  )
}

export default OnboardingPopup
