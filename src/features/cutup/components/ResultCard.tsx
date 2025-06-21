import { Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"

const ResultPaper = styled(Paper)(({ theme }) => ({
  width: "350px",
  height: "100px",
  padding: theme.spacing(2),
}))

const Text = styled("div")(() => ({
  overflow: "clip",
}))

interface ResultCardProps {
  text: string
}

const ResultCard = ({ text }: ResultCardProps) => {
  return (
    <ResultPaper>
      <Text>
        <Typography variant="body1">{text}</Typography>
      </Text>
    </ResultPaper>
  )
}

export default ResultCard
