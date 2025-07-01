import { styled } from "@mui/material/styles"

type Spacing = "start" | "end" | "space-around" | "space-between"

interface ControlBarLayoutProps {
  spacing?: Spacing
}

const getJustifyContent = (spacing?: Spacing) => {
  switch (spacing) {
    case "space-around":
      return "space-around"
    case "space-between":
      return "space-between"
    case "end":
      return "flex-end"
    case "start":
    default:
      return "flex-start"
  }
}

const ControlBarLayout = styled("div", {
  shouldForwardProp: prop => prop !== "spacing",
})<ControlBarLayoutProps>(({ theme, spacing }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: getJustifyContent(spacing),
  gap: theme.spacing(2),
  padding: theme.spacing(1),
}))

export default ControlBarLayout
