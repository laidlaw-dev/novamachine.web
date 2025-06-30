import { styled } from "@mui/material/styles"
import Error from "../features/system_feedback/components/Error"

const FullPage = styled("div")(() => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "stretch",
}))

const ErrorPage = () => {
  return (
    <FullPage>
      <Error />
    </FullPage>
  )
}

export default ErrorPage
