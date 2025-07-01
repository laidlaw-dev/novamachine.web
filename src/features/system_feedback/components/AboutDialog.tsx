import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import { useTranslation } from "react-i18next"
import DialogActionButton from "../../../components/inputs/DialogActionButton"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"

const DialogBody = styled("div")(({ theme }) => ({
  minWidth: "256px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  alignItems: "center",
}))

const IconContainer = styled("div")(() => ({
  width: "128px",
  height: "128px",
  objectFit: "contain",
  "& img": {
    width: "100%",
    height: "100%",
  },
}))

interface AboutDialogProps {
  open: boolean
  onClose: () => void
}

const AboutDialog = ({ open, onClose }: AboutDialogProps) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("app.name")}</DialogTitle>
      <DialogBody>
        <IconContainer>
          <img src="nvm_icon.svg" />
        </IconContainer>
        <Typography variant="caption">
          {t("app.copyright", { year: new Date().getFullYear() })}
        </Typography>
      </DialogBody>
      <DialogActions>
        <DialogActionButton onClick={onClose}>
          {t("common.close")}
        </DialogActionButton>
      </DialogActions>
    </Dialog>
  )
}

export default AboutDialog
