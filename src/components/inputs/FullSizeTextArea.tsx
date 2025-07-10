import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import { extendedPalette } from "../../theme/colors"
import type { DetailedHTMLProps, HTMLAttributes } from "react"
import FlexSpacer from "../../layouts/FlexSpacer"
import Button from "@mui/material/Button"
import { useTranslation } from "react-i18next"

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

const BottomContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(1),
}))

const ErrorMessage = styled("span")(({ theme }) => ({
  lineHeight: "2rem",
  color: theme.palette.error.main,
}))

interface FullSizeTextAreaProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  placeholder?: string
  errorMessage?: string
  onClearText?: () => void
}

const FullSizeTextArea = (props: FullSizeTextAreaProps) => {
  const { t } = useTranslation()
  const { errorMessage, onClearText, ...textareaProps } = props
  return (
    <OuterContainer>
      <Container>
        <BorderlessTextArea {...textareaProps} />
      </Container>
      <BottomContainer>
        {props.errorMessage && (
          <ErrorMessage role="alert">{errorMessage}</ErrorMessage>
        )}
        <FlexSpacer />
        {props.onClearText && (
          <Button color="secondary" variant="text" onClick={onClearText}>
            {t("cut_up.clear_source_text")}
          </Button>
        )}
      </BottomContainer>
    </OuterContainer>
  )
}

export default FullSizeTextArea
