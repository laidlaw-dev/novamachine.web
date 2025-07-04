import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import IconActionButton from "../../../components/inputs/IconActionButton"
import DeleteOutlined from "@mui/icons-material/DeleteOutlined"
import type { CutUpText } from "../hooks/cutUpReducerFunction"

const CupUpResultPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
}))

const TextContainer = styled(Typography)(() => ({
  flex: 1,
}))

interface CutUpResultProps {
  text: CutUpText
  onDelete: (index: number) => void
}

const CutUpResult = ({ text, onDelete }: CutUpResultProps) => {
  return (
    <CupUpResultPaper data-testid={`result_${text.index}`}>
      <TextContainer variant="mono">{text.text}</TextContainer>
      <IconActionButton onClick={() => onDelete(text.index)}>
        <DeleteOutlined />
      </IconActionButton>
    </CupUpResultPaper>
  )
}

export default CutUpResult
