import { styled } from "@mui/material/styles"
import { extendedPalette } from "../theme/colors"

export interface ControlPanelLayoutProps {
  width?: number | string
  color?: "background" | "paper"
}

const ControlPanelLayout = styled("div", {
  shouldForwardProp: propName => propName != "color" && propName !== "width",
})<ControlPanelLayoutProps>(({ theme, width, color }) => ({
  width: width,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor:
    color === "background"
      ? theme.palette.background.default
      : theme.palette.background.paper,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor:
    color === "background"
      ? extendedPalette.backgroundFocus
      : extendedPalette.containerFocus,
  borderRadius: theme.shape.borderRadius,
}))

export default ControlPanelLayout
