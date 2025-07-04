import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import { useTranslation } from "react-i18next"
import DialogActionButton from "../../../components/inputs/DialogActionButton"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import FlexSpacer from "../../../layouts/FlexSpacer"
import { getAppVersion } from "../utils/appVersion"
import type { ReactNode } from "react"
import Link from "@mui/material/Link"

const DialogBody = styled("div")(({ theme }) => ({
  minHeight: "256px",
  minWidth: "256px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  alignItems: "center",
  zIndex: 1,
}))

const IconContainer = styled("div")(() => ({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  objectFit: "contain",
  opacity: 0.15,
  zIndex: -1,
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
        <InfoBox heading={t("system.version")}>{getAppVersion()}</InfoBox>
        <InfoBox heading={t("system.git_hub")}>
          <Link
            href={import.meta.env.VITE_GITHUB_WEBCLIENT}
            underline="hover"
            color="secondary"
            variant="body1"
            target="_blank"
          >
            {import.meta.env.VITE_GITHUB_WEBCLIENT}
          </Link>
        </InfoBox>
        <FlexSpacer />
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

const InfoBoxContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: theme.spacing(1),
  "& > div": {
    paddingLeft: theme.spacing(0.5),
  },
}))

interface InfoBoxProps {
  heading: string
  children?: ReactNode
}

const InfoBox = ({ heading, children }: InfoBoxProps) => {
  return (
    <InfoBoxContainer>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {heading}
      </Typography>
      {children != null && <div>{children}</div>}
    </InfoBoxContainer>
  )
}

export default AboutDialog
