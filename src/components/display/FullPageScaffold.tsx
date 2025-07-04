import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import FlexSpacer from "../../layouts/FlexSpacer"
import { useEffect } from "react"
import useOnboardingTour from "../../features/onboarding/hooks/useOnboardingTour"
import SystemMenu from "../../features/system/components/SystemMenu"

const Title = styled("header")(({ theme }) => ({
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
  overflowY: "auto",
}))

const FullPageLayout = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "stretch",
  backgroundColor: theme.palette.background.default,
}))

interface FullPageScaffoldProps {
  title: string
  pageKey?: string
  children: React.ReactNode
}

const FullPageScaffold = ({
  title,
  pageKey,
  children,
}: FullPageScaffoldProps) => {
  const { registerPage } = useOnboardingTour()

  useEffect(() => {
    if (pageKey) {
      registerPage(pageKey)
    }
  }, [pageKey, registerPage])

  return (
    <FullPageLayout>
      <Title>
        <Typography variant="h4">{title}</Typography>
        <FlexSpacer />
        <SystemMenu hasOnboardingTour={pageKey != null} />
      </Title>
      <Body>{children}</Body>
    </FullPageLayout>
  )
}

export default FullPageScaffold
