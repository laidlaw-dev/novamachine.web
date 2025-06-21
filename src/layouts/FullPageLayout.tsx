import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const Title = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}))

const Body = styled("div")(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
}))

const FullPage = styled("div")(({ theme }) => ({
  width: "100wh",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "stretch",
  backgroundColor: theme.palette.background.default,
}))

interface FullPageLayoutProps {
  title: string
  children: React.ReactNode
}

const FullPageLayout = ({ title, children }: FullPageLayoutProps) => {
  return (
    <FullPage>
      <Title>
        <Typography variant="h3">{title}</Typography>
      </Title>
      <Body>{children}</Body>
    </FullPage>
  )
}

export default FullPageLayout
