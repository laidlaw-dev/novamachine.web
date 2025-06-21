import { styled } from "@mui/material/styles"
import ResultCard from "./ResultCard"

const OuterPanel = styled("div")(() => ({
  height: "100%",
  overflowY: "auto",
}))

const Panel = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}))

interface ResultPanelProps {
  results: string[]
}

const ResultPanel = ({ results }: ResultPanelProps) => {
  return (
    <OuterPanel>
      <Panel>
        {results.map((result: string, index: number) => (
          <ResultCard key={index} text={result} />
        ))}
      </Panel>
    </OuterPanel>
  )
}

export default ResultPanel
