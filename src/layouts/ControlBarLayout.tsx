import { styled } from "@mui/material/styles"

const ControlBarLayout = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
}))

export default ControlBarLayout
