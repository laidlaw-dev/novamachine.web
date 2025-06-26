import { styled } from "@mui/material/styles"
import type { ControlPanelLayoutProps } from "./ControlPanelLayout"
import { extendedPalette } from "../theme/colors"
import ControlPanelLayout from "./ControlPanelLayout"
import Typography from "@mui/material/Typography"
import type { ReactNode } from "react"

interface LabelProps {
  color?: "background" | "paper"
}

const Label = styled("div", {
  shouldForwardProp: propName => propName != "color",
})<LabelProps>(({ theme, color }) => ({
  position: "absolute",
  left: theme.spacing(2),
  top: theme.spacing(-1.0),
  display: "flex",
  justifyContent: "center",
  padding: `0px ${theme.spacing(1)}`,
  color:
    color === "background"
      ? extendedPalette.backgroundFocus
      : extendedPalette.containerFocus,
  backgroundColor:
    color === "background"
      ? theme.palette.background.default
      : theme.palette.background.paper,
}))

interface LabelledControlPanelLayoutProps extends ControlPanelLayoutProps {
  label: string
  children: ReactNode | ReactNode[]
}

const LabelledControlPanelLayout = ({
  label,
  width,
  color,
  children,
}: LabelledControlPanelLayoutProps) => {
  return (
    <ControlPanelLayout width={width} color={color}>
      <Label color={color}>
        <Typography
          variant="caption"
          sx={{ lineHeight: 1, fontWeight: "bold" }}
        >
          {label}
        </Typography>
      </Label>
      {children}
    </ControlPanelLayout>
  )
}

export default LabelledControlPanelLayout
