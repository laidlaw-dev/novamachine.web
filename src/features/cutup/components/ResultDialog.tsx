import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"

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
            <div key={index}>
              <Typography variant="body1">{cutUp}</Typography>
            </div>
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
