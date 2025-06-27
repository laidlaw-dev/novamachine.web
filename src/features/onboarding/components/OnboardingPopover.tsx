import { styled } from "@mui/material/styles"
import { colors } from "../../../theme/colors"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Popper from "@mui/material/Popper"
import Paper from "@mui/material/Paper"
import { useState } from "react"

const PopoverContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  color: theme.palette.info.main,
  backgroundColor: colors.info[100],
}))

const PopoverTitle = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.info.contrastText,
  backgroundColor: theme.palette.info.main,
}))

const PopoverBody = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  flex: 1,
}))

const PopoverButtons = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1),
}))

const Arrow = styled("div")(({ theme }) => ({
  position: "absolute",
  fontSize: 7,
  bottom: 0,
  left: 0,
  marginBottom: "-0.9em",
  width: "3em",
  height: "1em",
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "1em 1em 0 1em",
    borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
  },
}))

interface OnboardingPopoverProps {
  targetElement: Element
  title: string
  text: string
  stepNumber: number
  totalSteps: number
  onNext: () => void
  onEnd: () => void
}

const OnboardingPopover = ({
  targetElement,
  title,
  text,
  stepNumber,
  totalSteps,
  onNext,
  onEnd,
}: OnboardingPopoverProps) => {
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null)

  return (
    <Popper
      open={true}
      anchorEl={targetElement}
      modifiers={[
        {
          name: "arrow",
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
    >
      <PopoverContainer>
        <PopoverTitle>
          <Typography variant="h6">{title}</Typography>
        </PopoverTitle>
        <PopoverBody>
          <Typography variant="body1">{text}</Typography>
          <Typography variant="body2">
            {stepNumber} / {totalSteps}
          </Typography>
        </PopoverBody>
        <PopoverButtons>
          <Button variant="text" color="info" onClick={onEnd}>
            End tour
          </Button>
          {stepNumber < totalSteps && (
            <Button variant="text" color="info" onClick={onNext}>
              Next
            </Button>
          )}
        </PopoverButtons>
      </PopoverContainer>
      <Arrow ref={setArrowRef} />
    </Popper>
  )
}

export default OnboardingPopover
