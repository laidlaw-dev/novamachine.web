import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import { styled } from "@mui/material/styles"
import { useTranslation } from "react-i18next"
import ControlBarLayout from "../../../layouts/ControlBarLayout"
import ContentCopy from "@mui/icons-material/ContentCopy"
import DialogActionButton from "../../../components/inputs/DialogActionButton"
import IconActionButton from "../../../components/inputs/IconActionButton"
import CutUpResult from "./CutUpResult"
import type { CutUpText } from "../hooks/cutUpReducer"
import DeleteOutlined from "@mui/icons-material/DeleteOutlined"
import AnimatedList from "../../../components/display/AnimatedList"

const Panel = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
}))

interface ResultDialogProps {
  cutUpResults: CutUpText[]
  open: boolean
  onClose: () => void
  onDeleteSingle: (index: number) => void
  onDeleteAll: () => void
  onReorder: (keys: string[]) => void
  onCopyToClipboard: () => void
}

const ResultDialog = ({
  cutUpResults,
  open,
  onClose,
  onDeleteSingle,
  onDeleteAll,
  onReorder,
  onCopyToClipboard,
}: ResultDialogProps) => {
  const { t } = useTranslation()
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{t("cut_up.results")}</DialogTitle>
      <ControlBarLayout>
        <IconActionButton
          title={t("common.copy_to_clipboard")}
          onClick={onCopyToClipboard}
        >
          <ContentCopy />
        </IconActionButton>
        <IconActionButton title={t("common.delete_all")} onClick={onDeleteAll}>
          <DeleteOutlined />
        </IconActionButton>
      </ControlBarLayout>
      <Panel>
        <AnimatedList onReorder={onReorder}>
          {cutUpResults.map(item => (
            <CutUpResult
              key={item.index}
              text={item}
              onDelete={onDeleteSingle}
            />
          ))}
        </AnimatedList>
      </Panel>
      <DialogActions>
        <DialogActionButton onClick={onClose}>
          {t("common.close")}
        </DialogActionButton>
      </DialogActions>
    </Dialog>
  )
}

export default ResultDialog
