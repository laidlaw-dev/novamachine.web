import { styled } from "@mui/material/styles"
import { useTranslation } from "react-i18next"

const ErrorContainer = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px",
}))

const ErrorTextContainer = styled("div")(() => ({
  position: "relative",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Bebas Neue",
}))

const ErrorImageContainer = styled("div")(() => ({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  opacity: 0.25,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  objectFit: "contain",
  "& img": {
    width: "100%",
    height: "100%",
  },
}))

const SmallText = styled("div")(() => ({
  fontSize: "24px",
}))

const LargeText = styled("div")(() => ({
  fontSize: "48px",
}))

const Error = () => {
  const { t } = useTranslation()

  return (
    <ErrorContainer role="alert">
      <ErrorTextContainer>
        <ErrorImageContainer>
          <img src="nvm_icon.svg" />
        </ErrorImageContainer>
        <div>
          <SmallText>{t("system_feedback.error_general_sub_1")}</SmallText>
          <LargeText>{t("system_feedback.error_general")}</LargeText>
          <SmallText style={{ textAlign: "end" }}>
            {t("system_feedback.error_general_sub_2")}
          </SmallText>
        </div>
      </ErrorTextContainer>
    </ErrorContainer>
  )
}

export default Error
