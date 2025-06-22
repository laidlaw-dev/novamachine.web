import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"

const Container = styled(Paper)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "clip",
}))

const BorderlessTextArea = styled("textarea")(() => ({
  width: "100%",
  height: "100%",
  resize: "none",
  outline: "none",
  border: "none",
  backgroundColor: "transparent",
}))

const FullSizeTextArea = (props: any) => {
  return (
    <Container>
      <BorderlessTextArea {...props} />
    </Container>
  )
}

export default FullSizeTextArea
