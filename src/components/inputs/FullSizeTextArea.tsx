import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import { extendedPalette } from "../../theme/colors"

const Container = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "clip",
  padding: theme.spacing(1),
  "&:focus-within": {
    outline: `2px solid ${extendedPalette.containerFocus}`,
  },
}))

const BorderlessTextArea = styled("textarea")(() => ({
  width: "100%",
  height: "100%",
  resize: "none",
  outline: "none",
  fontFamily: "Cousine",
  border: "none",
  backgroundColor: "transparent",
  fontSize: "1rem",
}))

const FullSizeTextArea = (props: any) => {
  return (
    <Container>
      <BorderlessTextArea {...props} />
    </Container>
  )
}

export default FullSizeTextArea
