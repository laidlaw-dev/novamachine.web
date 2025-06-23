import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import Paper from "@mui/material/Paper"

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
  cutUps: string[]
  open: boolean
  onClose: () => void
}

const ResultDialog = ({ cutUps, open, onClose }: ResultDialogProps) => {
  const { t } = useTranslation()

  const handleCopyToClipboard = () => {
    const text = cutUps.join(" ").trim()
    navigator.clipboard.writeText(text)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{t("cut_up.cut_ups")}</DialogTitle>
      <OuterPanel>
        <Panel>
          {cutUps.map((cutUp, index) => (
            <Paper key={index} sx={{ padding: 1 }}>
              <Typography variant="mono">{cutUp}</Typography>
            </Paper>
          ))}
        </Panel>
      </OuterPanel>
      <DialogActions>
        <Button onClick={handleCopyToClipboard}>{t("common.copy")}</Button>
        <Button onClick={onClose}>{t("common.close")}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ResultDialog
