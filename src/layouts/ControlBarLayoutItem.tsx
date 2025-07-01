import { styled } from "@mui/material/styles"

type Size = "small" | "medium" | "large"

interface ControlBarLayoutItemProps {
  size?: Size
}

const getFlex = (size?: Size) => {
  switch (size) {
    case "large":
      return 3
    case "medium":
      return 2
    case "small":
      return 1
    default:
      return undefined
  }
}

const ControlBarLayoutItem = styled("div", {
  shouldForwardProp: prop => prop != "size",
})<ControlBarLayoutItemProps>(({ size }) => ({
  flex: getFlex(size),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

export default ControlBarLayoutItem
