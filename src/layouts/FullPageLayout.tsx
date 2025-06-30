import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import FlexSpacer from "./FlexSpacer"
import { useEffect } from "react"
import useOnboardingTour from "../features/onboarding/hooks/useOnboardingTour"
import Help from "@mui/icons-material/Help"
import { useTranslation } from "react-i18next"
import * as ELEMENT from "../consts/elementKeys"

const Title = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}))

const Body = styled("div")(({ theme }) => ({
  flex: 1,
  overflow: "hidden",
  padding: theme.spacing(1),
}))

const FullPage = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "stretch",
  backgroundColor: theme.palette.background.default,
}))

interface FullPageLayoutProps {
  title: string
  pageKey?: string
  children: React.ReactNode
}

const FullPageLayout = ({ title, pageKey, children }: FullPageLayoutProps) => {
  const { t } = useTranslation()
  const { registerPage, registerElement, startTour } = useOnboardingTour()

  useEffect(() => {
    if (pageKey) {
      registerPage(pageKey)
    }
  }, [pageKey, registerPage])

  return (
    <FullPage>
      <Title>
        <Typography variant="h3">{title}</Typography>
        <FlexSpacer />
        <Tooltip title={t("onboarding.help")}>
          <IconButton
            ref={element => registerElement(ELEMENT.COMMON_HELP, element)}
            color="inherit"
            onClick={() => startTour()}
          >
            <Help />
          </IconButton>
        </Tooltip>
      </Title>
      <Body>{children}</Body>
    </FullPage>
  )
}

export default FullPageLayout
