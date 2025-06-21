import { styled } from "@mui/material/styles"

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid black",
  borderRadius: theme.shape.borderRadius,
  overflow: "clip",
}))

const BorderlessTextArea = styled("textarea")(() => ({
  width: "100%",
  height: "100%",
  resize: "none",
  outline: "none",
  border: "none",
}))

const FullSizeTextArea = (props: any) => {
  return (
    <Container>
      <BorderlessTextArea {...props} />
    </Container>
  )
}

export default FullSizeTextArea
