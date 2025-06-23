import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import Paper from "@mui/material/Paper"
import ControlBarLayout from "../../../layouts/ControlBarLayout"
import ContentCopy from "@mui/icons-material/ContentCopy"
import DialogActionButton from "../../../components/inputs/DialogActionButton"
import IconActionButton from "../../../components/inputs/IconActionButton"

const OuterPanel = styled("div")(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(1),
  overflowY: "auto",
}))

const Panel = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
}))

interface ResultDialogProps {
  cutUpResults: string[]
  open: boolean
  onClose: () => void
}

const ResultDialog = ({ cutUpResults, open, onClose }: ResultDialogProps) => {
  const { t } = useTranslation()

  const handleCopyToClipboard = () => {
    const text = cutUpResults.join(" ").trim()
    navigator.clipboard.writeText(text)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{t("cut_up.cut_ups")}</DialogTitle>
      <ControlBarLayout>
        <IconActionButton
          title={"common.copy_to_clipboard"}
          onClick={handleCopyToClipboard}
        >
          <ContentCopy />
        </IconActionButton>
      </ControlBarLayout>
      <OuterPanel>
        <Panel>
          {cutUpResults.map((text, index) => (
            <Paper key={index} sx={{ padding: 1 }}>
              <Typography variant="mono">{text}</Typography>
            </Paper>
          ))}
        </Panel>
      </OuterPanel>
      <DialogActions>
        <DialogActionButton onClick={onClose}>
          {t("common.close")}
        </DialogActionButton>
      </DialogActions>
    </Dialog>
  )
}

export default ResultDialog
