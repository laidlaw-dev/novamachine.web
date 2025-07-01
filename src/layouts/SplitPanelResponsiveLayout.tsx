import { styled } from "@mui/material/styles"

const SplitPanelResponsiveLayout = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
    "& > div": {
      minHeight: "600px",
    },
  },
  width: "100%",
  height: "100%",
  display: "flex",
  gap: theme.spacing(1),
}))

export default SplitPanelResponsiveLayout
