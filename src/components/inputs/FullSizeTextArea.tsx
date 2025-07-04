import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import { extendedPalette } from "../../theme/colors"
import type { DetailedHTMLProps, HTMLAttributes } from "react"

const Container = styled(Paper)(({ theme }) => ({
  flex: 1,
  gap: theme.spacing(1),
  justifyContent: "center",
  alignItems: "center",
  overflow: "clip",
  padding: theme.spacing(1),
  "&:focus-within": {
    outline: `2px solid ${extendedPalette.containerFocus}`,
  },
}))

const OuterContainer = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "stretch",
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

const ErrorMessage = styled("span")(({ theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.error.main,
}))

interface FullSizeTextAreaProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  placeholder?: string
  errorMessage?: string
}

const FullSizeTextArea = (props: FullSizeTextAreaProps) => {
  return (
    <OuterContainer>
      <Container>
        <BorderlessTextArea {...props} />
      </Container>
      {props.errorMessage && (
        <ErrorMessage role="alert">{props.errorMessage}</ErrorMessage>
      )}
    </OuterContainer>
  )
}

export default FullSizeTextArea
