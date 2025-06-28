import { styled, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import PopperWithArrow from "../../../components/display/PopperWithArrow"
import { type PopperPlacementType } from "@mui/material"
import type { Ref } from "react"

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
  alignItems: "center",
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

interface OnboardingPopoverProps {
  targetElement: Element
  title: string
  text: string
  stepNumber: number
  totalSteps: number
  placement?: PopperPlacementType
  onNext: () => void
  onEnd: () => void
  ref?: Ref<HTMLDivElement>
}

const OnboardingPopover = ({
  targetElement,
  title,
  text,
  stepNumber,
  totalSteps,
  placement,
  onNext,
  onEnd,
  ref,
}: OnboardingPopoverProps) => {
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
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">
            {stepNumber} / {totalSteps}
          </Typography>
        </PopoverTitle>
        <PopoverBody>
          <Typography variant="body1">{text}</Typography>
        </PopoverBody>
        <PopoverButtons>
          <Button variant="text" color="inherit" onClick={onEnd}>
            End tour
          </Button>
          {stepNumber < totalSteps && (
            <Button variant="text" color="inherit" onClick={onNext}>
              Next
            </Button>
          )}
        </PopoverButtons>
      </PopoverContainer>
    </PopperWithArrow>
  )
}

export default OnboardingPopover
